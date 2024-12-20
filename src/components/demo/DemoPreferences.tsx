import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { BasicInfoStep } from "./preferences/BasicInfoStep";
import { SocialMediaStep } from "./preferences/SocialMediaStep";
import { BookingStep } from "./preferences/BookingStep";
import { RewardStep } from "./preferences/RewardStep";

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
      <BasicInfoStep
        restaurantName={restaurantName}
        setRestaurantName={setRestaurantName}
        googleMapsUrl={googleMapsUrl}
        setGoogleMapsUrl={setGoogleMapsUrl}
        contactEmail={contactEmail}
        setContactEmail={setContactEmail}
        websiteUrl={websiteUrl}
        setWebsiteUrl={setWebsiteUrl}
      />

      <SocialMediaStep
        facebookUrl={facebookUrl}
        setFacebookUrl={setFacebookUrl}
        instagramUrl={instagramUrl}
        setInstagramUrl={setInstagramUrl}
      />

      <BookingStep
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        bookingUrl={bookingUrl}
        setBookingUrl={setBookingUrl}
        preferredBookingMethod={preferredBookingMethod}
        setPreferredBookingMethod={setPreferredBookingMethod}
      />

      <RewardStep
        uniqueReward={uniqueReward}
        setUniqueReward={setUniqueReward}
      />

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