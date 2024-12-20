import { Button } from "@/components/ui/button";
import { Camera, Image } from "lucide-react";

interface MenuUploadStepProps {
  isAnalyzing: boolean;
  menuData: any;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MenuUploadStep = ({ isAnalyzing, menuData, onFileSelect }: MenuUploadStepProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Image className="h-5 w-5" />
        <h3>Step 2: Upload your menu</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={onFileSelect}
            className="hidden"
            id="menu-library"
          />
          <label htmlFor="menu-library">
            <Button
              variant="outline"
              className="w-full"
              disabled={isAnalyzing}
              asChild
            >
              <div className="flex items-center justify-center">
                <Image className="mr-2 h-4 w-4" />
                <span>{isAnalyzing ? "Uploading..." : "Choose from Library"}</span>
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
            id="menu-camera"
          />
          <label htmlFor="menu-camera">
            <Button
              variant="outline"
              className="w-full"
              disabled={isAnalyzing}
              asChild
            >
              <div className="flex items-center justify-center">
                <Camera className="mr-2 h-4 w-4" />
                <span>{isAnalyzing ? "Uploading..." : "Take Photo"}</span>
              </div>
            </Button>
          </label>
        </div>
      </div>

      {menuData && (
        <p className="text-sm text-green-600 text-center">
          ✓ Menu uploaded successfully! Your email will include your latest menu.
        </p>
      )}
    </div>
  );
};