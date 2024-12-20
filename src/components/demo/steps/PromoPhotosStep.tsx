import { ReceiptUploadSection } from "../ReceiptUploadSection";

interface PromoPhotosStepProps {
  isUploading: boolean;
  photos: string[];
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PromoPhotosStep = ({ isUploading, photos, onFileSelect }: PromoPhotosStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <h3>Step 3: Add appetizing food photos to showcase your dishes</h3>
      </div>
      <ReceiptUploadSection 
        onFileSelect={onFileSelect}
        isAnalyzing={isUploading}
        analysisResult={photos.length > 0}
        successMessage="Food photo added successfully!"
      />
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Food photo ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};