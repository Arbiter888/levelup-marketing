import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RewardSectionProps {
  uniqueReward: string;
}

export const RewardSection = ({ uniqueReward }: RewardSectionProps) => {
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
        <Button variant="outline" className="bg-white hover:bg-primary/5">
          <Gift className="mr-2 h-4 w-4" />
          Claim Reward
        </Button>
      </div>
    </div>
  );
};