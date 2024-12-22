import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HeroSection } from "./website/HeroSection";
import { ContactSection } from "./website/ContactSection";
import { LocationPreview } from "./website/LocationPreview";
import { SocialSection } from "./website/SocialSection";
import { RewardSection } from "./website/RewardSection";

interface MicroWebsiteProps {
  slug: string;
}

export const MicroWebsite = ({ slug }: MicroWebsiteProps) => {
  const [websiteData, setWebsiteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWebsite = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurant_websites')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setWebsiteData(data);
      } catch (err) {
        console.error('Error loading website:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadWebsite();
    }
  }, [slug]);

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

  const handleBookTable = () => {
    const bookingUrl = websiteData.website_content?.booking_url;
    if (bookingUrl) {
      window.open(bookingUrl.startsWith('http') ? bookingUrl : `https://${bookingUrl}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection 
        businessName={websiteData.restaurant_name}
        businessDescription={websiteData.website_content?.business_description}
        onBookTable={websiteData.website_content?.booking_url ? handleBookTable : undefined}
      />
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-12">
        <ContactSection 
          email={websiteData.website_content?.contact_email}
          phone={websiteData.website_content?.phone_number}
        />
        <LocationPreview googleMapsUrl={websiteData.website_content?.google_maps_url} />
        <SocialSection 
          websiteUrl={websiteData.website_content?.website_url}
          facebookUrl={websiteData.website_content?.facebook_url}
          instagramUrl={websiteData.website_content?.instagram_url}
        />
        <RewardSection />
      </div>
    </div>
  );
};