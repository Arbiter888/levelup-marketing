import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EmailPreviewButtonProps {
  onPreviewEmail: () => void;
  isGenerating: boolean;
}

export const EmailPreviewButton = ({ onPreviewEmail, isGenerating }: EmailPreviewButtonProps) => {
  return (
    <Button
      onClick={onPreviewEmail}
      disabled={isGenerating}
      className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300"
    >
      <Mail className="mr-2 h-5 w-5" />
      <span>Preview Email Campaign</span>
    </Button>
  );
};