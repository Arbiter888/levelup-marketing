import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ReceiptUploadSectionProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAnalyzing: boolean;
  analysisResult: boolean;
  successMessage?: string;
}

export const ReceiptUploadSection = ({ 
  onFileSelect, 
  isAnalyzing, 
  analysisResult,
  successMessage = "Receipt uploaded successfully!"
}: ReceiptUploadSectionProps) => {
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(event);
      toast({
        title: "✅ Success!",
        description: successMessage,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          variant="outline"
          className={`w-full max-w-md relative ${
            analysisResult ? "bg-green-50" : ""
          }`}
          disabled={isAnalyzing}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept="image/*"
          />
          <Upload className="mr-2 h-4 w-4" />
          {isAnalyzing ? (
            "Uploading..."
          ) : analysisResult ? (
            "Upload another"
          ) : (
            "Upload file"
          )}
        </Button>
      </div>
    </div>
  );
};