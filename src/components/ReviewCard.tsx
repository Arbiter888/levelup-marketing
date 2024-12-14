import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { nanoid } from 'nanoid';

interface ReviewCardProps {
  businessName: string;
  businessImage?: string;
}

export const ReviewCard = ({ businessName, businessImage }: ReviewCardProps) => {
  const [review, setReview] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const { toast } = useToast();

  const handleRefineReview = async () => {
    if (!review.trim()) return;

    setIsRefining(true);
    try {
      const { data, error } = await supabase.functions.invoke('refine-review', {
        body: { review },
      });

      if (error) throw error;
      
      setReview(data.refinedReview);
      toast({
        title: "Review refined!",
        description: "Your review has been professionally refined.",
      });
    } catch (error) {
      console.error('Error refining review:', error);
      toast({
        title: "Error",
        description: "Failed to refine review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!review.trim()) return;

    setIsSubmitting(true);
    const code = nanoid(8);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          review_text: review,
          unique_code: code,
          business_name: businessName,
        });

      if (error) throw error;

      setUniqueCode(code);
      toast({
        title: "Review submitted!",
        description: "Your review has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyAndRedirect = () => {
    navigator.clipboard.writeText(review);
    toast({
      title: "Review copied!",
      description: "Opening Google Reviews in a new tab...",
    });
    window.open("https://www.google.com/maps/place/Multiplier/@51.5149056,-0.1261213,17z/data=!3m1!4b1!4m6!3m5!1s0x487605aa8ce68713:0x3e67ee3bbf612e91!8m2!3d51.5149056!4d-0.1235464!16s%2Fg%2F11g_rx295s?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D", "_blank");
  };

  return (
    <div className="glass-card rounded-xl p-6 max-w-xl w-full mx-auto space-y-6 fade-in">
      <div className="flex items-center space-x-4">
        {businessImage && (
          <img
            src={businessImage}
            alt={businessName}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{businessName}</h2>
          <p className="text-sm text-muted-foreground">Write your review below</p>
        </div>
      </div>

      <Textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience..."
        className="min-h-[150px] resize-none"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleRefineReview}
          disabled={!review || isRefining}
          className="button-hover flex-1"
          variant="outline"
        >
          {isRefining ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refine Review
        </Button>

        {!uniqueCode ? (
          <Button
            onClick={handleSubmitReview}
            disabled={!review || isSubmitting}
            className="button-hover flex-1"
          >
            Submit Review
          </Button>
        ) : (
          <Button
            onClick={handleCopyAndRedirect}
            className="button-hover flex-1"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy & Submit to Google
          </Button>
        )}
      </div>

      {uniqueCode && (
        <div className="mt-4 p-4 bg-secondary rounded-lg">
          <p className="text-center">
            Your unique review code: <span className="font-mono font-bold">{uniqueCode}</span>
          </p>
          <p className="text-sm text-center text-muted-foreground mt-2">
            Save this code to track your review status
          </p>
        </div>
      )}
    </div>
  );
};