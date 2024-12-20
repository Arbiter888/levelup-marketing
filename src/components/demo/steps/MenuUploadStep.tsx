import { ReceiptUploadSection } from "../ReceiptUploadSection";

interface MenuUploadStepProps {
  isAnalyzing: boolean;
  menuData: any;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MenuUploadStep = ({ isAnalyzing, menuData, onFileSelect }: MenuUploadStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <h3>Step 2: Upload your menu to help us create your website</h3>
      </div>
      <ReceiptUploadSection 
        onFileSelect={onFileSelect}
        isAnalyzing={isAnalyzing}
        analysisResult={!!menuData}
        successMessage="Menu uploaded successfully!"
      />
    </div>
  );
};