import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EmailGenerationSectionProps {
  isGenerating: boolean;
  promotionText: string;
  onGenerate: () => Promise<void>;
}

export const EmailGenerationSection = ({ 
  isGenerating, 
  promotionText,
  onGenerate 
}: EmailGenerationSectionProps) => {
  const { toast } = useToast();

  const handleGenerate = async () => {
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
      onClick={handleGenerate}
      disabled={isGenerating || !promotionText.trim()}
      className="w-full bg-primary hover:bg-primary/90 text-white"
    >
      {isGenerating ? "Generating Email..." : "Generate Email Copy"}
    </Button>
  );
};