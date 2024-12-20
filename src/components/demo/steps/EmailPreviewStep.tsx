import { Button } from "@/components/ui/button";
import { Mail, Copy } from "lucide-react";

interface EmailPreviewStepProps {
  emailCopy: string;
  isGenerating: boolean;
  onPreviewEmail: () => void;
}

export const EmailPreviewStep = ({ emailCopy, isGenerating, onPreviewEmail }: EmailPreviewStepProps) => {
  if (!emailCopy) return null;

  return (
    <div className="space-y-4">
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <h3 className="font-semibold text-xl mb-4">Generated Email Copy</h3>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: emailCopy }} />
        </div>
      </div>
      
      <Button
        onClick={onPreviewEmail}
        disabled={isGenerating}
        className="w-full bg-[#E94E87] hover:bg-[#E94E87]/90 text-white shadow-lg space-x-2"
      >
        <div className="flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          <span>Preview Generated Email</span>
          <Copy className="ml-2 h-5 w-5" />
        </div>
      </Button>
    </div>
  );
};