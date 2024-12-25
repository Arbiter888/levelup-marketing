import { EmailPreviewButton } from "../email/EmailPreviewButton";
import { EmailContent } from "../email/EmailContent";
import { nanoid } from "nanoid";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

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
      const emailHtml = localStorage.getItem('lastGeneratedHtmlEmail');
      
      if (!emailHtml) {
        toast({
          title: "Missing email HTML",
          description: "Please generate the email first.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          to: [contactEmail],
          subject: `🎁 Special Offer from ${restaurantName || 'Our Restaurant'}`,
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

  const copyHtmlToClipboard = async () => {
    const htmlEmail = localStorage.getItem('lastGeneratedHtmlEmail');
    if (htmlEmail) {
      try {
        await navigator.clipboard.writeText(htmlEmail);
        toast({
          title: "Copied!",
          description: "Email HTML copied to clipboard",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to copy HTML. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No HTML Available",
        description: "Please generate the email first.",
        variant: "destructive",
      });
    }
  };

  if (!emailCopy) return null;

  return (
    <div className="space-y-4">
      <EmailContent emailCopy={emailCopy} businessName={restaurantName} />
      <div className="flex gap-2">
        <EmailPreviewButton 
          onPreviewEmail={handlePreviewEmail} 
          isGenerating={isGenerating} 
        />
        <Button
          onClick={copyHtmlToClipboard}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy Email HTML
        </Button>
      </div>
    </div>
  );
};