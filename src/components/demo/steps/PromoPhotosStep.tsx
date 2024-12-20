import { Button } from "@/components/ui/button";
import { Camera, Image, X } from "lucide-react";
import { DishPhoto } from "@/types/photo";
import { PhotoUploadForm } from "./PhotoUploadForm";

interface PromoPhotosStepProps {
  isUploading: boolean;
  photos: DishPhoto[];
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>, dishName: string) => void;
  onRemovePhoto?: (index: number) => void;
}

export const PromoPhotosStep = ({ 
  isUploading, 
  photos, 
  onFileSelect,
  onRemovePhoto 
}: PromoPhotosStepProps) => {
  const handlePhotoAdded = (photo: DishPhoto) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => onFileSelect(e as any, photo.dishName);
    fileInput.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Image className="h-5 w-5" />
        <h3>Step 3: Upload food photos to promote</h3>
      </div>

      <PhotoUploadForm onPhotoAdded={handlePhotoAdded} isUploading={isUploading} />

      {photos.length > 0 && (
        <>
          <p className="text-sm text-green-600 text-center">
            ✓ {photos.length} photo{photos.length !== 1 ? 's' : ''} added to your email campaign
          </p>
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img 
                  src={photo.url}
                  alt={photo.dishName}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-2 text-center text-sm font-medium text-gray-700">
                  {photo.dishName}
                </p>
                {onRemovePhoto && (
                  <button
                    onClick={() => onRemovePhoto(index)}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};