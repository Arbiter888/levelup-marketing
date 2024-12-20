import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Globe, Facebook, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AiFeedbackSection } from "./AiFeedbackSection";
import { AiSurveyWidget } from "./AiSurveyWidget";
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

interface SupabaseWebsiteData {
  restaurant_name: string;
  website_content: string | WebsiteContent;
  slug: string;
  id: string;
  created_at: string;
  theme_color: string | null;
  contact_info: any | null;
  menu_sections: any | null;
  hero_image: string | null;
  gallery: any | null;
}

interface MicroWebsiteProps {
  slug: string;
}

export const MicroWebsite = ({ slug }: MicroWebsiteProps) => {
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAiWidget, setShowAiWidget] = useState(false);

  useEffect(() => {
    const loadWebsite = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurant_websites')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (data) {
          const transformedData: WebsiteData = {
            restaurant_name: data.restaurant_name,
            website_content: typeof data.website_content === 'string' 
              ? JSON.parse(data.website_content) 
              : data.website_content
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
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 md:p-8 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {restaurant_name}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Contact & Location</h2>
              
              {website_content.google_maps_url && (
                <a 
                  href={website_content.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <MapPin className="h-5 w-5" />
                  <span>View on Google Maps</span>
                </a>
              )}

              {website_content.phone_number && (
                <a 
                  href={`tel:${website_content.phone_number}`}
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Phone className="h-5 w-5" />
                  <span>{website_content.phone_number}</span>
                </a>
              )}

              {website_content.contact_email && (
                <a 
                  href={`mailto:${website_content.contact_email}`}
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Mail className="h-5 w-5" />
                  <span>{website_content.contact_email}</span>
                </a>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Follow Us</h2>
              
              {website_content.website_url && (
                <a 
                  href={website_content.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Globe className="h-5 w-5" />
                  <span>Visit our Website</span>
                </a>
              )}

              {website_content.facebook_url && (
                <a 
                  href={website_content.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Facebook className="h-5 w-5" />
                  <span>Follow on Facebook</span>
                </a>
              )}

              {website_content.instagram_url && (
                <a 
                  href={website_content.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Follow on Instagram</span>
                </a>
              )}
            </div>
          </div>

          <AiFeedbackSection onTakeAiSurvey={handleAiBooking} />
          
          <div className="pt-8 border-t">
            <h2 className="text-2xl font-semibold text-center mb-8">
              What Our Customers Say
            </h2>
            <ExampleReviews />
          </div>
        </CardContent>
      </Card>
      <AiSurveyWidget show={showAiWidget} />
    </div>
  );
};