import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DemoPreferencesProps {
  onPreferencesSaved: (name: string, url: string, email: string) => void;
}

export const DemoPreferences = ({ onPreferencesSaved }: DemoPreferencesProps) => {
  const [restaurantName, setRestaurantName] = useState("The Local Kitchen & Bar");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("https://maps.app.goo.gl/Nx23mQHet4TBfctJ6");
  const [contactEmail, setContactEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [preferredBookingMethod, setPreferredBookingMethod] = useState("phone");
  const [uniqueReward, setUniqueReward] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedPreferences = localStorage.getItem('demoPreferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      setRestaurantName(preferences.restaurantName || "");
      setGoogleMapsUrl(preferences.googleMapsUrl || "");
      setContactEmail(preferences.contactEmail || "");
      setWebsiteUrl(preferences.websiteUrl || "");
      setFacebookUrl(preferences.facebookUrl || "");
      setInstagramUrl(preferences.instagramUrl || "");
      setPhoneNumber(preferences.phoneNumber || "");
      setBookingUrl(preferences.bookingUrl || "");
      setPreferredBookingMethod(preferences.preferredBookingMethod || "phone");
      setUniqueReward(preferences.uniqueReward || "");
      onPreferencesSaved(preferences.restaurantName, preferences.googleMapsUrl, preferences.contactEmail || "");
    }
  }, [onPreferencesSaved]);

  const handleSavePreferences = () => {
    if (!restaurantName.trim() || !googleMapsUrl.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both restaurant name and Google Maps URL.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const preferences = {
        restaurantName,
        googleMapsUrl,
        contactEmail,
        websiteUrl,
        facebookUrl,
        instagramUrl,
        phoneNumber,
        bookingUrl,
        preferredBookingMethod,
        uniqueReward,
      };
      
      localStorage.setItem('demoPreferences', JSON.stringify(preferences));
      onPreferencesSaved(restaurantName, googleMapsUrl, contactEmail);
      setShowSuccess(true);
      
      toast({
        title: "Preferences saved!",
        description: "Your demo has been customized successfully.",
      });

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="facebookUrl">Facebook URL</Label>
          <Input
            id="facebookUrl"
            type="url"
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
            placeholder="Enter Facebook page URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagramUrl">Instagram URL</Label>
          <Input
            id="instagramUrl"
            type="url"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            placeholder="Enter Instagram profile URL"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter contact phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="uniqueReward">Unique Reward</Label>
        <Input
          id="uniqueReward"
          value={uniqueReward}
          onChange={(e) => setUniqueReward(e.target.value)}
          placeholder="Enter the reward (e.g., '10% off your next visit')"
        />
      </div>

      <div className="space-y-2">
        <Label>Preferred Booking Method</Label>
        <RadioGroup
          value={preferredBookingMethod}
          onValueChange={setPreferredBookingMethod}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone">Phone</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="website" id="website" />
            <Label htmlFor="website">Website</Label>
          </div>
        </RadioGroup>
      </div>

      {preferredBookingMethod === 'website' && (
        <div className="space-y-2">
          <Label htmlFor="bookingUrl">Booking URL</Label>
          <Input
            id="bookingUrl"
            type="url"
            value={bookingUrl}
            onChange={(e) => setBookingUrl(e.target.value)}
            placeholder="Enter booking page URL"
          />
        </div>
      )}

      <Button 
        onClick={handleSavePreferences}
        disabled={isSaving}
        className={`w-full transition-all duration-300 ${
          showSuccess 
            ? "bg-green-500 hover:bg-green-600" 
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {showSuccess ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Saved Successfully!
          </>
        ) : isSaving ? (
          "Saving..."
        ) : (
          "Save Demo Preferences"
        )}
      </Button>
    </div>
  );
};