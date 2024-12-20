import { Gift, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RewardSectionProps {
  uniqueReward: string;
}

export const RewardSection = ({ uniqueReward }: RewardSectionProps) => {
  const [uniqueCode] = useState(() => nanoid(8));
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleEmailClick = async () => {
    setIsSending(true);
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Special Offer Redemption</h2>
          <p>Thank you for your interest in our special offer!</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 18px; color: #E94E87; margin-bottom: 10px;">Your Special Offer:</p>
            <p style="font-size: 16px; color: #333;">${uniqueReward}</p>
            <p style="font-size: 14px; color: #666; margin-top: 10px;">Redemption Code: ${uniqueCode}</p>
          </div>
          <p style="color: #666;">Present this code during your visit to claim your reward. Valid for dine-in only.</p>
        </div>
      `;

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: ['preview@eatup.co'],
          subject: 'Your Special Offer Redemption Code',
          html: emailHtml,
        },
      });

      if (error) throw error;

      toast({
        title: "Email Sent!",
        description: "Check your inbox for the special offer details.",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 via-accent to-primary/5 rounded-2xl p-8 border border-primary/10">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Gift className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-secondary">Special Offer</h2>
      </div>
      
      <div className="text-center space-y-4">
        <p className="text-xl font-semibold text-primary">{uniqueReward}</p>
        <p className="text-gray-600">
          Present this offer during your visit to claim your reward. Valid for dine-in only.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" className="bg-white hover:bg-primary/5">
            <Gift className="mr-2 h-4 w-4" />
            Code: {uniqueCode}
          </Button>
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90"
            onClick={handleEmailClick}
            disabled={isSending}
          >
            <Mail className="mr-2 h-4 w-4" />
            {isSending ? 'Sending...' : 'Email to Redeem'}
          </Button>
        </div>
      </div>
    </div>
  );
};