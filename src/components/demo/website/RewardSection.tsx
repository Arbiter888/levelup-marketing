import { Gift, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface RewardSectionProps {
  uniqueReward: string;
}

export const RewardSection = ({ uniqueReward }: RewardSectionProps) => {
  const [uniqueCode] = useState(() => nanoid(8));
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("george@multiplier.info");
  const { toast } = useToast();

  const handleEmailClick = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 30px;">
            <h2 style="color: #E94E87; margin-bottom: 20px; text-align: center;">Your Special Offer</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #E94E87;">
              <p style="font-size: 18px; color: #E94E87; margin-bottom: 10px; text-align: center;">${uniqueReward}</p>
              <p style="font-size: 16px; color: #333; text-align: center; margin-top: 15px;">
                Redemption Code: <strong style="color: #E94E87;">${uniqueCode}</strong>
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
          to: [email],
          subject: '🎁 Your Special Offer is Here!',
          html: emailHtml,
        },
      });

      if (error) throw error;

      toast({
        title: "Email Sent!",
        description: "Check your inbox for the special offer details.",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 via-accent to-primary/5 rounded-2xl p-8 border border-primary/10">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Gift className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-secondary">Special Offer</h2>
      </div>
      
      <div className="text-center space-y-4">
        <p className="text-xl font-semibold text-primary">{uniqueReward}</p>
        <p className="text-gray-600">
          Present this offer during your visit to claim your reward. Valid for dine-in only.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-center">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-xs"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="bg-white hover:bg-primary/5">
              <Gift className="mr-2 h-4 w-4" />
              Code: {uniqueCode}
            </Button>
            <Button 
              variant="default" 
              className="bg-primary hover:bg-primary/90"
              onClick={handleEmailClick}
              disabled={isSending}
            >
              <Mail className="mr-2 h-4 w-4" />
              {isSending ? 'Sending...' : 'Email to Redeem'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};