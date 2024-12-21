import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoStepProps {
  restaurantName: string;
  setRestaurantName: (value: string) => void;
  googleMapsUrl: string;
  setGoogleMapsUrl: (value: string) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (value: string) => void;
  businessDescription: string;
  setBusinessDescription: (value: string) => void;
}

export const BasicInfoStep = ({
  restaurantName,
  setRestaurantName,
  googleMapsUrl,
  setGoogleMapsUrl,
  contactEmail,
  setContactEmail,
  websiteUrl,
  setWebsiteUrl,
  businessDescription,
  setBusinessDescription,
}: BasicInfoStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          placeholder="Enter your business name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="businessDescription">Business Description</Label>
        <Textarea
          id="businessDescription"
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          placeholder="Describe your business (e.g., type of business, what you offer, etc.)"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
        <Input
          id="googleMapsUrl"
          value={googleMapsUrl}
          onChange={(e) => setGoogleMapsUrl(e.target.value)}
          placeholder="Paste your Google Maps link"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Demo Contact Email (for test emails)</Label>
        <Input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Enter email for test campaigns"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Website URL</Label>
        <Input
          id="websiteUrl"
          type="url"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="Enter your website URL"
        />
      </div>
    </div>
  );
};