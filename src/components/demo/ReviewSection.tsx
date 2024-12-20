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
import { nanoid } from 'nanoid';

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
  const [googleMapsUrl, setGoogleMapsUrl] = useState(customGoogleMapsUrl || "https://maps.app.goo.gl/Nx23mQHet4TBfctJ6");
  const [restaurantName, setRestaurantName] = useState(customRestaurantName || "The Local Kitchen & Bar");
  const [preferences, setPreferences] = useState<DemoPreferences>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedPreferences = localStorage.getItem('demoPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
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

  const handlePreviewEmail = () => {
    const uniqueCode = nanoid(8);
    setRewardCode(uniqueCode);
    
    const emailBody = emailCopy.replace('[UNIQUE_CODE]', uniqueCode);
    navigator.clipboard.writeText(emailBody);
    
    toast({
      title: "Email preview ready!",
      description: "Opening email preview with your content.",
    });

    // Create email preview
    const recipients = ['preview@eatup.co'];
    const subject = encodeURIComponent(`${restaurantName} - Special Offer`);
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:${recipients.join(',')}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <Card>
      <CardContent className="space-y-8 pt-6">
        {!hidePreferences && (
          <DemoPreferences onPreferencesSaved={handlePreferencesSaved} />
        )}
        
        <div className="text-center">
          <div className="space-y-2">
            <p className="text-lg font-medium text-primary">
              Create Your Email Campaign! 📧
            </p>
            <div className="text-gray-600">
              <p>Create an engaging email campaign in 3 simple steps:</p>
              <p>1. Share your promotion or menu highlights</p>
              <p>2. Enter the reward for customers</p>
              <p>3. Add appetizing food photos</p>
              <p className="text-primary mt-2">Preview your email and start engaging with your customers!</p>
            </div>
          </div>
        </div>

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
          onPreviewEmail={handlePreviewEmail}
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