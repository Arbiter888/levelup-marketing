import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RewardStepProps {
  uniqueReward: string;
  setUniqueReward: (value: string) => void;
}

export const RewardStep = ({
  uniqueReward,
  setUniqueReward,
}: RewardStepProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="uniqueReward">Unique Reward</Label>
      <Input
        id="uniqueReward"
        value={uniqueReward}
        onChange={(e) => setUniqueReward(e.target.value)}
        placeholder="Enter the reward (e.g., '10% off your next visit')"
      />
    </div>
  );
};