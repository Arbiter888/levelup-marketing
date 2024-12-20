import { EmailPreviewButton } from "../email/EmailPreviewButton";
import { EmailContent } from "../email/EmailContent";

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
  uniqueReward?: string; // Add uniqueReward prop
  onPreviewEmail?: () => void;
}

export const EmailPreviewStep = ({ 
  emailCopy, 
  isGenerating, 
  onPreviewEmail,
  restaurantName = "Our Restaurant",
  websiteUrl,
  facebookUrl,
  instagramUrl,
  phoneNumber,
  googleMapsUrl,
  uniqueCode,
  uniqueReward
}: EmailPreviewStepProps) => {
  if (!emailCopy) return null;

  return (
    <div className="space-y-4">
      <EmailContent emailCopy={emailCopy} />
      <EmailPreviewButton 
        onPreviewEmail={onPreviewEmail || (() => {})} 
        isGenerating={isGenerating} 
      />
    </div>
  );
};