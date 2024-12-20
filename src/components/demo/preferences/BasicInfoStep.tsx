import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoStepProps {
  restaurantName: string;
  setRestaurantName: (value: string) => void;
  googleMapsUrl: string;
  setGoogleMapsUrl: (value: string) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (value: string) => void;
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
}: BasicInfoStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="restaurantName">Restaurant Name</Label>
        <Input
          id="restaurantName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          placeholder="Enter your restaurant name"
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
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Enter restaurant contact email"
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