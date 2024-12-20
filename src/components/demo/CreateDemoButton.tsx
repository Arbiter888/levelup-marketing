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

  const handleCreateWebsite = async () => {
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

      const preferences = JSON.parse(savedPreferences);
      const { 
        restaurantName, 
        googleMapsUrl, 
        contactEmail,
        websiteUrl,
        facebookUrl,
        instagramUrl,
        phoneNumber,
        bookingUrl,
        preferredBookingMethod 
      } = preferences;

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
        .from('restaurant_websites')
        .insert([
          {
            restaurant_name: restaurantName,
            slug: uniqueSlug,
            website_content: {
              google_maps_url: googleMapsUrl,
              contact_email: contactEmail,
              website_url: websiteUrl,
              facebook_url: facebookUrl,
              instagram_url: instagramUrl,
              phone_number: phoneNumber,
              booking_url: bookingUrl,
              preferred_booking_method: preferredBookingMethod
            }
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      const websiteUrl = `/demo/${uniqueSlug}`;
      await navigator.clipboard.writeText(`${window.location.origin}${websiteUrl}`);

      toast({
        title: "Website created!",
        description: "The URL has been copied to your clipboard.",
      });

      if (onPageCreated) {
        onPageCreated(websiteUrl);
      }

    } catch (error) {
      console.error('Error creating website:', error);
      toast({
        title: "Error",
        description: "Failed to create website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button
      onClick={handleCreateWebsite}
      disabled={isCreating}
      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 md:py-6"
    >
      {isCreating ? "Creating..." : "Create Micro-Website"}
      <Link2 className="ml-2 h-4 w-4 md:h-5 md:w-5" />
    </Button>
  );
};