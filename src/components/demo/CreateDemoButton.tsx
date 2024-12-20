import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const generateUniqueSlug = (baseName: string) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${timestamp}-${randomString}`;
};

interface CreateDemoButtonProps {
  onPageCreated?: (url: string) => void;
}

export const CreateDemoButton = ({ onPageCreated }: CreateDemoButtonProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateCampaignGenerator = async () => {
    try {
      setIsCreating(true);
      const savedPreferences = localStorage.getItem('demoPreferences');
      
      if (!savedPreferences) {
        toast({
          title: "Missing preferences",
          description: "Please set your restaurant preferences first.",
          variant: "destructive",
        });
        return;
      }

      const { restaurantName, googleMapsUrl, contactEmail } = JSON.parse(savedPreferences);
      if (!restaurantName || !googleMapsUrl) {
        toast({
          title: "Missing preferences",
          description: "Please set your restaurant preferences first.",
          variant: "destructive",
        });
        return;
      }

      const uniqueSlug = generateUniqueSlug(restaurantName);

      const { data, error } = await supabase
        .from('campaign_generator_pages')
        .insert([
          {
            restaurant_name: restaurantName,
            google_maps_url: googleMapsUrl,
            contact_email: contactEmail,
            slug: uniqueSlug,
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      const lovableUrl = `https://32802680-4753-4ba5-98e8-7b0522c3f6f0.lovableproject.com/campaign/${uniqueSlug}`;
      await navigator.clipboard.writeText(lovableUrl);

      toast({
        title: "Campaign generator page created!",
        description: "The URL has been copied to your clipboard.",
      });

      if (onPageCreated) {
        onPageCreated(`/campaign/${uniqueSlug}`);
      }

    } catch (error) {
      console.error('Error creating campaign generator:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign generator page. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button
      onClick={handleCreateCampaignGenerator}
      disabled={isCreating}
      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 md:py-6"
    >
      {isCreating ? "Creating..." : "Create Campaign Generator"}
      <Link2 className="ml-2 h-4 w-4 md:h-5 md:w-5" />
    </Button>
  );
};