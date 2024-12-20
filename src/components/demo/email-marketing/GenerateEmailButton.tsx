import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface GenerateEmailButtonProps {
  isGenerating: boolean;
  promotionText: string;
  onGenerate: () => Promise<void>;
}

export const GenerateEmailButton = ({ 
  isGenerating, 
  promotionText,
  onGenerate 
}: GenerateEmailButtonProps) => {
  const { toast } = useToast();

  const handleClick = async () => {
    if (!promotionText.trim()) {
      toast({
        title: "Promotion required",
        description: "Please write your promotion details before generating.",
        variant: "destructive",
      });
      return;
    }
    await onGenerate();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isGenerating || !promotionText.trim()}
      className="w-full bg-primary hover:bg-primary/90 text-white"
    >
      {isGenerating ? "Generating Email..." : "Generate Email Copy"}
    </Button>
  );
};