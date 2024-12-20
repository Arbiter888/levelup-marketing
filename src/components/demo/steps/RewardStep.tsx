import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";

interface RewardStepProps {
  uniqueReward: string;
  onChange: (value: string) => void;
  onComplete?: () => void;
}

export const RewardStep = ({ uniqueReward, onChange, onComplete }: RewardStepProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (onComplete && e.target.value.trim()) {
      onComplete();
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Gift className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Step 2: Set Your Reward</h3>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="uniqueReward">What reward will customers receive?</Label>
        <Textarea
          id="uniqueReward"
          value={uniqueReward}
          onChange={handleChange}
          placeholder="e.g., '10% off your next visit' or 'Free dessert with any main course'"
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          This reward will be displayed with the unique code in the generated email.
        </p>
      </div>
    </Card>
  );
};