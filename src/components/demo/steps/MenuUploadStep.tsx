import { ReceiptUploadSection } from "../ReceiptUploadSection";
import { Menu } from "lucide-react";

interface MenuUploadStepProps {
  isAnalyzing: boolean;
  menuData: any;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MenuUploadStep = ({ isAnalyzing, menuData, onFileSelect }: MenuUploadStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Menu className="h-5 w-5" />
        <h3>Step 2: Upload your menu</h3>
      </div>
      <ReceiptUploadSection 
        onFileSelect={onFileSelect}
        isAnalyzing={isAnalyzing}
        analysisResult={menuData !== null}
        successMessage="Menu uploaded successfully!"
      />
    </div>
  );
};