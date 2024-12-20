import { ReceiptUploadSection } from "../ReceiptUploadSection";
import { Image } from "lucide-react";

interface PromoPhotosStepProps {
  isUploading: boolean;
  photos: string[];
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PromoPhotosStep = ({ isUploading, photos, onFileSelect }: PromoPhotosStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Image className="h-5 w-5" />
        <h3>Step 3: Upload food photos to promote</h3>
      </div>
      <ReceiptUploadSection 
        onFileSelect={onFileSelect}
        isAnalyzing={isUploading}
        analysisResult={photos.length > 0}
      />
      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo, index) => (
            <img 
              key={index}
              src={photo}
              alt={`Promo photo ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};