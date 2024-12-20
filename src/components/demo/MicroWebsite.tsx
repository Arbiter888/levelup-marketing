import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AiSurveyWidget } from "./AiSurveyWidget";
import { HeroSection } from "./website/HeroSection";
import { ContactSection } from "./website/ContactSection";
import { SocialSection } from "./website/SocialSection";
import { LocationPreview } from "./website/LocationPreview";
import { RewardSection } from "./website/RewardSection";
import { ExampleReviews } from "@/components/ExampleReviews";

interface WebsiteContent {
  google_maps_url: string;
  contact_email?: string;
  website_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  phone_number?: string;
  booking_url?: string;
  preferred_booking_method?: string;
}

interface WebsiteData {
  restaurant_name: string;
  website_content: WebsiteContent;
}

export const MicroWebsite = ({ slug }: { slug: string }) => {
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAiWidget, setShowAiWidget] = useState(false);

  useEffect(() => {
    const loadWebsite = async () => {
      try {
        const { data: websiteData, error: websiteError } = await supabase
          .from('restaurant_websites')
          .select('*')
          .eq('slug', slug)
          .single();

        if (websiteError) throw websiteError;

        if (websiteData) {
          const transformedData: WebsiteData = {
            restaurant_name: websiteData.restaurant_name,
            website_content: typeof websiteData.website_content === 'string' 
              ? JSON.parse(websiteData.website_content) 
              : websiteData.website_content
          };
          setWebsiteData(transformedData);
        }
      } catch (err) {
        console.error('Error loading website:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadWebsite();
  }, [slug]);

  const handleAiBooking = () => {
    setShowAiWidget(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!websiteData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Website not found</div>
      </div>
    );
  }

  const { restaurant_name, website_content } = websiteData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
      <HeroSection 
        restaurantName={restaurant_name}
        onBookTable={handleAiBooking}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <ContactSection websiteContent={website_content} />
        
        {website_content.google_maps_url && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Location</h2>
            <LocationPreview googleMapsUrl={website_content.google_maps_url} />
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">What Our Guests Say</h2>
          <ExampleReviews />
        </div>

        <RewardSection uniqueReward="10% off your next visit when you dine with us" />

        <SocialSection websiteContent={website_content} />
      </div>

      <AiSurveyWidget show={showAiWidget} />
    </div>
  );
};