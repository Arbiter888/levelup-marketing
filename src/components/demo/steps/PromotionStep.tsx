import { Textarea } from "@/components/ui/textarea";
import { Gift } from "lucide-react";

interface PromotionStepProps {
  promotionText: string;
  onChange: (value: string) => void;
  onComplete?: () => void;
}

export const PromotionStep = ({ promotionText, onChange, onComplete }: PromotionStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Gift className="h-5 w-5" />
        <h3>Step 1: Share your promotion or product highlight</h3>
      </div>
      <Textarea
        value={promotionText}
        onChange={(e) => {
          onChange(e.target.value);
          if (onComplete && e.target.value.trim().length > 0) {
            onComplete();
          }
        }}
        placeholder="What would you like to promote? Tell us about your amazing products, special discounts, or limited-time offers!"
        className="min-h-[150px] bg-white/50 font-medium resize-none"
      />
    </div>
  );
};