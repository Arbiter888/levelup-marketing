import { Textarea } from "@/components/ui/textarea";
import { Gift } from "lucide-react";

interface PromotionStepProps {
  promotionText: string;
  onChange: (value: string) => void;
  onComplete?: () => void; // Make onComplete optional
}

export const PromotionStep = ({ promotionText, onChange, onComplete }: PromotionStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Gift className="h-5 w-5" />
        <h3>Step 1: Share your promotion or menu highlight</h3>
      </div>
      <Textarea
        value={promotionText}
        onChange={(e) => {
          onChange(e.target.value);
          if (e.target.value.trim().length > 0 && onComplete) {
            onComplete();
          }
        }}
        placeholder="What special offer or menu items would you like to promote? Tell us about your amazing dishes, special discounts, or limited-time offers!"
        className="min-h-[150px] bg-white/50 font-medium resize-none"
      />
    </div>
  );
};