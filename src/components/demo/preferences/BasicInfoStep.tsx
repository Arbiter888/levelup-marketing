import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BasicInfoStepProps {
  restaurantName: string;
  setRestaurantName: (value: string) => void;
  googleMapsUrl: string;
  setGoogleMapsUrl: (value: string) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (value: string) => void;
  businessDescription: string;
  setBusinessDescription: (value: string) => void;
}

export const BasicInfoStep = ({
  restaurantName,
  setRestaurantName,
  googleMapsUrl,
  setGoogleMapsUrl,
  contactEmail,
  setContactEmail,
  websiteUrl,
  setWebsiteUrl,
  businessDescription,
  setBusinessDescription,
}: BasicInfoStepProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { toast } = useToast();

  const handleEnhanceDescription = async () => {
    if (!businessDescription.trim()) {
      toast({
        title: "Empty description",
        description: "Please enter a business description first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsEnhancing(true);
      console.log('Sending description to enhance:', businessDescription);
      
      const { data, error } = await supabase.functions.invoke('enhance-description', {
        body: { description: businessDescription },
      });

      console.log('Response from enhance-description:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data?.enhancedText) {
        throw new Error('No enhanced text received from the API');
      }

      // Update the business description state with the enhanced text
      setBusinessDescription(data.enhancedText);
      
      toast({
        title: "Description enhanced!",
        description: "Your business description has been professionally improved.",
      });
    } catch (error) {
      console.error('Error enhancing description:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to enhance description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          placeholder="Enter your business name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="businessDescription">Business Description</Label>
        <div className="space-y-2">
          <Textarea
            id="businessDescription"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            placeholder="Describe your business (e.g., type of business, what you offer, etc.)"
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleEnhanceDescription}
            disabled={isEnhancing}
            variant="outline"
            className="w-full"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {isEnhancing ? "Enhancing..." : "Enhance Description with AI"}
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
        <Input
          id="googleMapsUrl"
          value={googleMapsUrl}
          onChange={(e) => setGoogleMapsUrl(e.target.value)}
          placeholder="Paste your Google Maps link"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Demo Contact Email (for test emails)</Label>
        <Input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Enter email for test campaigns"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Website URL</Label>
        <Input
          id="websiteUrl"
          type="url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="Enter your website URL"
        />
      </div>
    </div>
  );
};