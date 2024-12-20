import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DishPhoto } from "@/types/photo";

interface PhotoUploadFormProps {
  onPhotoAdded: (photo: DishPhoto) => void;
  isUploading: boolean;
}

export const PhotoUploadForm = ({ onPhotoAdded, isUploading }: PhotoUploadFormProps) => {
  const [dishName, setDishName] = useState("");
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!dishName.trim()) {
      toast({
        title: "Please enter a dish name",
        description: "The dish name is required to add the photo.",
        variant: "destructive",
      });
      return;
    }
    // This will be called after successful upload in parent
    onPhotoAdded({ url: "", dishName });
    setDishName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter dish name (e.g., Chicken Tikka Masala)"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
        disabled={isUploading}
      />
      <Button type="submit" disabled={isUploading || !dishName.trim()}>
        {isUploading ? "Uploading..." : "Add Photo"}
      </Button>
    </form>
  );
};