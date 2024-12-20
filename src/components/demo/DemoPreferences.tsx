import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { ContactSection } from "./sections/ContactSection";
import { SocialSection } from "./sections/SocialSection";
import { BookingSection } from "./sections/BookingSection";
import { WebsiteSection } from "./sections/WebsiteSection";

interface DemoPreferencesProps {
  onPreferencesSaved: (name: string, url: string, email: string) => void;
}

export const DemoPreferences = ({ onPreferencesSaved }: DemoPreferencesProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      restaurantName: "The Local Kitchen & Bar",
      googleMapsUrl: "https://maps.app.goo.gl/Nx23mQHet4TBfctJ6",
      contactEmail: "",
      websiteUrl: "",
      facebookUrl: "",
      instagramUrl: "",
      phoneNumber: "",
      bookingUrl: "",
      preferredBookingMethod: "phone",
      websiteDescription: "",
    },
  });

  useEffect(() => {
    const savedPreferences = localStorage.getItem('demoPreferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      Object.keys(preferences).forEach(key => {
        if (preferences[key]) {
          form.setValue(key, preferences[key]);
        }
      });
      onPreferencesSaved(
        preferences.restaurantName,
        preferences.googleMapsUrl,
        preferences.contactEmail || ""
      );
    }
  }, [onPreferencesSaved, form]);

  const handleSavePreferences = form.handleSubmit((data) => {
    if (!data.restaurantName.trim() || !data.googleMapsUrl.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both restaurant name and Google Maps URL.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      localStorage.setItem('demoPreferences', JSON.stringify(data));
      onPreferencesSaved(data.restaurantName, data.googleMapsUrl, data.contactEmail);
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
  });

  return (
    <div className="space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSavePreferences} className="space-y-6">
        <WebsiteSection form={form} />
        <ContactSection form={form} />
        <SocialSection form={form} />
        <BookingSection form={form} />

        <Button 
          type="submit"
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
      </form>
    </div>
  );
};