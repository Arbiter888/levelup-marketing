import { Input } from "@/components/ui/input";
import { Gift } from "lucide-react";

interface RewardStepProps {
  uniqueReward: string;
  setUniqueReward: (value: string) => void;
}

export const RewardStep = ({ uniqueReward, setUniqueReward }: RewardStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Gift className="h-5 w-5" />
        <h3>Step 2: Enter reward for customers</h3>
      </div>
      <Input
        value={uniqueReward}
        onChange={(e) => setUniqueReward(e.target.value)}
        placeholder="Enter the reward (e.g., '10% off your next purchase')"
        className="bg-white/50"
      />
      <p className="text-sm text-gray-600">
        This reward will be shown to customers when they complete their review
      </p>
    </div>
  );
};