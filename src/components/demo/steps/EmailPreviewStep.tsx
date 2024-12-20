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
  uniqueCode?: string;
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
}: EmailPreviewStepProps) => {
  if (!emailCopy) return null;

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <h3 className="font-semibold text-xl mb-4">Email Marketing Preview</h3>
        <div className="prose max-w-none space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium">Subject: Special Offer from {restaurantName}</p>
          </div>
          <div 
            className="email-preview"
            dangerouslySetInnerHTML={{ __html: emailCopy }}
          />
        </div>
      </div>
      
      {uniqueCode && (
        <div className="p-4 bg-pink-50 border-2 border-dashed border-primary rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-2">Your Unique Reward Code:</p>
          <p className="font-mono text-xl font-bold text-primary">{uniqueCode}</p>
          <p className="text-sm text-gray-500 mt-2">
            Show this code to your server on your next visit!
          </p>
        </div>
      )}
      
      <Button
        onClick={onPreviewEmail}
        disabled={isGenerating}
        className="w-full bg-[#E94E87] hover:bg-[#E94E87]/90 text-white shadow-lg"
      >
        <Mail className="mr-2 h-5 w-5" />
        <span>Open Email Preview</span>
      </Button>

      <div className="flex flex-wrap gap-2 justify-center">
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