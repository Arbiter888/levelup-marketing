import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RewardsSection } from "./RewardsSection";
import { PromotionStep } from "./steps/PromotionStep";
import { MenuUploadStep } from "./steps/MenuUploadStep";
import { PromoPhotosStep } from "./steps/PromoPhotosStep";
import { EmailPreviewStep } from "./steps/EmailPreviewStep";
import { DemoPreferences } from "./DemoPreferences";
import { AiFeedbackSection } from "./AiFeedbackSection";
import { GenerateEmailButton } from "./email-marketing/GenerateEmailButton";
import { nanoid } from 'nanoid';

interface ReviewSectionProps {
  customRestaurantName?: string;
  customGoogleMapsUrl?: string;
  hidePreferences?: boolean;
  onTakeAiSurvey?: () => void;
}

export const ReviewSection = ({ 
  customRestaurantName,
  customGoogleMapsUrl,
  hidePreferences = false,
  onTakeAiSurvey
}: ReviewSectionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [promotionText, setPromotionText] = useState("");
  const [emailCopy, setEmailCopy] = useState("");
  const [menuData, setMenuData] = useState<any>(null);
  const [promoPhotos, setPromoPhotos] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rewardCode, setRewardCode] = useState<string | null>(null);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(customGoogleMapsUrl || "https://maps.app.goo.gl/Nx23mQHet4TBfctJ6");
  const [restaurantName, setRestaurantName] = useState(customRestaurantName || "The Local Kitchen & Bar");
  const { toast } = useToast();

  const handlePreferencesSaved = (name: string, url: string) => {
    setRestaurantName(name);
    setGoogleMapsUrl(url);
  };

  const handleMenuUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsAnalyzing(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('restaurant_menus')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('restaurant_menus')
        .getPublicUrl(filePath);

      setMenuData({ url: publicUrl });
      toast({
        title: "✅ Menu Added!",
        description: "Menu uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading menu:', error);
      toast({
        title: "Error",
        description: "Failed to upload menu. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
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
          menuUrl: menuData?.url || null,
          promoPhotos: promoPhotos,
          restaurantName: restaurantName
        },
      });

      if (error) throw error;
      
      setEmailCopy(data.emailCopy);
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

  const handleStep1Complete = () => {
    toast({
      title: "✅ Step 1 Complete!",
      description: "Great! Now you can add your menu and promotional photos.",
    });
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
              <p>2. Upload your latest menu</p>
              <p>3. Add appetizing food photos</p>
              <p className="text-primary mt-2">Preview your email and start engaging with your customers!</p>
            </div>
          </div>
        </div>

        <PromotionStep 
          promotionText={promotionText}
          onChange={setPromotionText}
          onComplete={handleStep1Complete}
        />

        <MenuUploadStep 
          isAnalyzing={isAnalyzing}
          menuData={menuData}
          onFileSelect={handleMenuUpload}
        />

        <PromoPhotosStep 
          isUploading={isAnalyzing}
          photos={promoPhotos}
          onFileSelect={handlePromoPhotoUpload}
        />

        <GenerateEmailButton 
          isGenerating={isGenerating}
          promotionText={promotionText}
          onGenerate={handleGenerateEmail}
        />

        <EmailPreviewStep 
          emailCopy={emailCopy}
          isGenerating={isGenerating}
          onPreviewEmail={handlePreviewEmail}
        />

        <div className="pt-6">
          <RewardsSection 
            rewardCode={rewardCode} 
            hasUploadedReceipt={!!menuData}
            customRestaurantName={restaurantName}
            customGoogleMapsUrl={googleMapsUrl}
          />
        </div>

        {onTakeAiSurvey && (
          <AiFeedbackSection onTakeAiSurvey={onTakeAiSurvey} />
        )}
      </CardContent>
    </Card>
  );
};