import { EmailPreviewButton } from "../email/EmailPreviewButton";
import { EmailContent } from "../email/EmailContent";
import { nanoid } from "nanoid";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailPreviewStepProps {
  emailCopy: string;
  isGenerating: boolean;
  restaurantName?: string;
  websiteUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  phoneNumber?: string;
  googleMapsUrl?: string;
  uniqueCode?: string | null;
  uniqueReward?: string;
}

export const EmailPreviewStep = ({ 
  emailCopy, 
  isGenerating,
  restaurantName,
  websiteUrl,
  facebookUrl,
  instagramUrl,
  phoneNumber,
  googleMapsUrl,
  uniqueCode,
  uniqueReward
}: EmailPreviewStepProps) => {
  const { toast } = useToast();

  const handlePreviewEmail = async () => {
    try {
      const savedPreferences = localStorage.getItem('demoPreferences');
      if (!savedPreferences) {
        toast({
          title: "Missing preferences",
          description: "Please set your demo preferences first.",
          variant: "destructive",
        });
        return;
      }

      const preferences = JSON.parse(savedPreferences);
      const contactEmail = preferences.contactEmail;

      if (!contactEmail) {
        toast({
          title: "Missing email",
          description: "Please set a demo contact email in preferences.",
          variant: "destructive",
        });
        return;
      }

      const code = uniqueCode || nanoid(8);
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 30px;">
            <h2 style="color: #E94E87; margin-bottom: 20px; text-align: center;">Your Special Offer</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #E94E87;">
              <p style="font-size: 18px; color: #E94E87; margin-bottom: 10px; text-align: center;">${uniqueReward}</p>
              <p style="font-size: 16px; color: #333; text-align: center; margin-top: 15px;">
                Redemption Code: <strong style="color: #E94E87;">${code}</strong>
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; text-align: center;">
                Present this code during your visit to claim your reward.<br>
                Valid for dine-in only.
              </p>
            </div>
          </div>
        </div>
      `;

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: [contactEmail],
          subject: '🎁 Your Special Offer is Here!',
          html: emailHtml,
        },
      });

      if (error) throw error;

      toast({
        title: "Email Sent!",
        description: `Preview email sent to ${contactEmail}`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!emailCopy) return null;

  return (
    <div className="space-y-4">
      <EmailContent emailCopy={emailCopy} />
      <EmailPreviewButton 
        onPreviewEmail={handlePreviewEmail} 
        isGenerating={isGenerating} 
      />
    </div>
  );
};