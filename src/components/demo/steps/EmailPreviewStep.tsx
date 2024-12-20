import { Button } from "@/components/ui/button";
import { Mail, Link, MapPin, Phone } from "lucide-react";

interface EmailPreviewStepProps {
  emailCopy: string;
  isGenerating: boolean;
  onPreviewEmail: () => void;
  restaurantName?: string;
  websiteUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  phoneNumber?: string;
  googleMapsUrl?: string;
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
}: EmailPreviewStepProps) => {
  if (!emailCopy) return null;

  const formatEmailContent = () => {
    let formattedEmail = emailCopy;
    
    // Add social links section if any social links exist
    if (websiteUrl || facebookUrl || instagramUrl) {
      formattedEmail += '\n\nConnect With Us:';
      if (websiteUrl) formattedEmail += `\n• Visit our website: ${websiteUrl}`;
      if (facebookUrl) formattedEmail += `\n• Follow us on Facebook: ${facebookUrl}`;
      if (instagramUrl) formattedEmail += `\n• Follow us on Instagram: ${instagramUrl}`;
    }

    // Add contact and location section
    formattedEmail += '\n\nVisit Us:';
    if (phoneNumber) formattedEmail += `\n• Call to book: ${phoneNumber}`;
    if (googleMapsUrl) formattedEmail += `\n• Find us on Google Maps: ${googleMapsUrl}`;

    return formattedEmail;
  };

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <h3 className="font-semibold text-xl mb-4">Email Preview</h3>
        <div className="prose max-w-none space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium">Subject: Special Offer from {restaurantName}</p>
          </div>
          <div 
            className="email-preview whitespace-pre-wrap font-sans text-gray-700"
            dangerouslySetInnerHTML={{ __html: emailCopy }}
          />
        </div>
      </div>
      
      <Button
        onClick={onPreviewEmail}
        disabled={isGenerating}
        className="w-full bg-[#E94E87] hover:bg-[#E94E87]/90 text-white shadow-lg"
      >
        <Mail className="mr-2 h-5 w-5" />
        <span>Open Email Preview</span>
      </Button>

      <div className="flex gap-2 justify-center">
        {websiteUrl && (
          <Button variant="outline" size="sm" onClick={() => window.open(websiteUrl, '_blank')}>
            <Link className="h-4 w-4 mr-1" />
            Website
          </Button>
        )}
        {googleMapsUrl && (
          <Button variant="outline" size="sm" onClick={() => window.open(googleMapsUrl, '_blank')}>
            <MapPin className="h-4 w-4 mr-1" />
            Directions
          </Button>
        )}
        {phoneNumber && (
          <Button variant="outline" size="sm" onClick={() => window.open(`tel:${phoneNumber}`, '_blank')}>
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
        )}
      </div>
    </div>
  );
};