import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PromotionStep } from "./steps/PromotionStep";
import { RewardStep } from "./steps/RewardStep";
import { PromoPhotosStep } from "./steps/PromoPhotosStep";
import { EmailPreviewStep } from "./steps/EmailPreviewStep";
import { DemoPreferences } from "./DemoPreferences";
import { AiFeedbackSection } from "./AiFeedbackSection";
import { EmailGenerationSection } from "./steps/EmailGenerationSection";
import { EmailCampaignIntro } from "./steps/EmailCampaignIntro";

interface ReviewSectionProps {
  customRestaurantName?: string;
  customGoogleMapsUrl?: string;
  hidePreferences?: boolean;
  onTakeAiSurvey?: () => void;
}

interface DemoPreferences {
  websiteUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  phoneNumber?: string;
  bookingUrl?: string;
  preferredBookingMethod?: string;
}

export const ReviewSection = ({ 
  customRestaurantName,
  customGoogleMapsUrl,
  hidePreferences = false,
  onTakeAiSurvey
}: ReviewSectionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [promotionText, setPromotionText] = useState("");
  const [uniqueReward, setUniqueReward] = useState("");
  const [emailCopy, setEmailCopy] = useState("");
  const [promoPhotos, setPromoPhotos] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rewardCode, setRewardCode] = useState<string | null>(null);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(customGoogleMapsUrl || "");
  const [restaurantName, setRestaurantName] = useState(customRestaurantName || "");
  const [preferences, setPreferences] = useState<DemoPreferences>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedPreferences = localStorage.getItem('demoPreferences');
    if (savedPreferences) {
      const parsedPrefs = JSON.parse(savedPreferences);
      setPreferences(parsedPrefs);
      setRestaurantName(parsedPrefs.restaurantName || "");
      setGoogleMapsUrl(parsedPrefs.googleMapsUrl || "");
    }
  }, []);

  const handlePreferencesSaved = (name: string, url: string) => {
    setRestaurantName(name);
    setGoogleMapsUrl(url);
  };

  const handlePromoPhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsAnalyzing(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('restaurant_photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('restaurant_photos')
        .getPublicUrl(filePath);

      setPromoPhotos(prev => [...prev, publicUrl]);
      toast({
        title: "✅ Photo Added!",
        description: "Promotional photo uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Error",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateEmail = async () => {
    try {
      setIsGenerating(true);
      
      const { data, error } = await supabase.functions.invoke('generate-email', {
        body: { 
          promotion: promotionText,
          promoPhotos: promoPhotos,
          restaurantName: restaurantName,
          websiteUrl: preferences.websiteUrl || '',
          facebookUrl: preferences.facebookUrl || '',
          instagramUrl: preferences.instagramUrl || '',
          phoneNumber: preferences.phoneNumber || '',
          bookingUrl: preferences.bookingUrl || '',
          preferredBookingMethod: preferences.preferredBookingMethod || 'phone',
          googleMapsUrl: googleMapsUrl,
          uniqueReward: uniqueReward
        },
      });

      if (error) throw error;
      
      setEmailCopy(data.emailCopy);
      setRewardCode(data.uniqueCode);
      // Store the HTML version in localStorage
      localStorage.setItem('lastGeneratedHtmlEmail', data.htmlEmail);
      
      toast({
        title: "✅ Email Generated!",
        description: "Your email has been professionally crafted.",
      });
    } catch (error) {
      console.error('Error generating email:', error);
      toast({
        title: "Error",
        description: "Failed to generate email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-8 pt-6">
        {!hidePreferences && (
          <DemoPreferences onPreferencesSaved={handlePreferencesSaved} />
        )}
        
        <EmailCampaignIntro />

        <PromotionStep 
          promotionText={promotionText}
          onChange={setPromotionText}
        />

        <RewardStep 
          uniqueReward={uniqueReward}
          setUniqueReward={setUniqueReward}
        />

        <PromoPhotosStep 
          isUploading={isAnalyzing}
          photos={promoPhotos}
          onFileSelect={handlePromoPhotoUpload}
        />

        <EmailGenerationSection 
          isGenerating={isGenerating}
          promotionText={promotionText}
          onGenerate={handleGenerateEmail}
        />

        <EmailPreviewStep 
          emailCopy={emailCopy}
          isGenerating={isGenerating}
          restaurantName={restaurantName}
          websiteUrl={preferences.websiteUrl}
          facebookUrl={preferences.facebookUrl}
          instagramUrl={preferences.instagramUrl}
          phoneNumber={preferences.phoneNumber}
          googleMapsUrl={googleMapsUrl}
          uniqueCode={rewardCode}
          uniqueReward={uniqueReward}
        />

        {onTakeAiSurvey && (
          <AiFeedbackSection onTakeAiSurvey={onTakeAiSurvey} />
        )}
      </CardContent>
    </Card>
  );
};
