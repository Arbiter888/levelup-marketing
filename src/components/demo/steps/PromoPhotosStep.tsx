import { Button } from "@/components/ui/button";
import { Camera, Image } from "lucide-react";

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={onFileSelect}
            className="hidden"
            id="promo-library"
          />
          <label htmlFor="promo-library">
            <Button
              variant="outline"
              className="w-full"
              disabled={isUploading}
              asChild
            >
              <div className="flex items-center justify-center">
                <Image className="mr-2 h-4 w-4" />
                <span>{isUploading ? "Uploading..." : "Choose from Library"}</span>
              </div>
            </Button>
          </label>
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={onFileSelect}
            className="hidden"
            id="promo-camera"
          />
          <label htmlFor="promo-camera">
            <Button
              variant="outline"
              className="w-full"
              disabled={isUploading}
              asChild
            >
              <div className="flex items-center justify-center">
                <Camera className="mr-2 h-4 w-4" />
                <span>{isUploading ? "Uploading..." : "Take Photo"}</span>
              </div>
            </Button>
          </label>
        </div>
      </div>

      {photos.length > 0 && (
        <>
          <p className="text-sm text-green-600 text-center">
            ✓ {photos.length} photo{photos.length !== 1 ? 's' : ''} added to your email campaign
          </p>
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
        </>
      )}
    </div>
  );
};