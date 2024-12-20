import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Clock, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AiFeedbackSection } from "./AiFeedbackSection";
import { AiSurveyWidget } from "./AiSurveyWidget";

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

interface Review {
  id: string;
  review_text: string;
  business_name: string;
  created_at: string;
  status: string;
}

export const MicroWebsite = ({ slug }: { slug: string }) => {
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
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

          // Fetch reviews for this restaurant
          const { data: reviewsData, error: reviewsError } = await supabase
            .from('reviews')
            .select('*')
            .eq('business_name', websiteData.restaurant_name)
            .eq('status', 'approved')
            .order('created_at', { ascending: false })
            .limit(5);

          if (reviewsError) throw reviewsError;
          setReviews(reviewsData || []);
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
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{restaurant_name}</h1>
          <p className="text-lg opacity-90">Experience Authentic Cuisine</p>
          <Button 
            size="lg" 
            className="mt-6 bg-white text-primary hover:bg-white/90"
            onClick={handleAiBooking}
          >
            Book a Table
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Contact & Hours Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-sm">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact & Location</h2>
            
            {website_content.google_maps_url && (
              <a 
                href={website_content.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span>View on Google Maps</span>
              </a>
            )}

            {website_content.phone_number && (
              <a 
                href={`tel:${website_content.phone_number}`}
                className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span>{website_content.phone_number}</span>
              </a>
            )}

            {website_content.contact_email && (
              <a 
                href={`mailto:${website_content.contact_email}`}
                className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span>{website_content.contact_email}</span>
              </a>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hours</h2>
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Customer Reviews</h2>
            <div className="grid gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">{review.review_text}</p>
                  <p className="text-sm text-gray-500 mt-3">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-6">
          {website_content.website_url && (
            <a 
              href={website_content.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Globe className="h-6 w-6" />
            </a>
          )}

          {website_content.facebook_url && (
            <a 
              href={website_content.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
          )}

          {website_content.instagram_url && (
            <a 
              href={website_content.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>

      <AiSurveyWidget show={showAiWidget} />
    </div>
  );
};