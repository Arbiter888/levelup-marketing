import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialMediaStepProps {
  facebookUrl: string;
  setFacebookUrl: (value: string) => void;
  instagramUrl: string;
  setInstagramUrl: (value: string) => void;
}

export const SocialMediaStep = ({
  facebookUrl,
  setFacebookUrl,
  instagramUrl,
  setInstagramUrl,
}: SocialMediaStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="facebookUrl">Facebook URL</Label>
        <Input
          id="facebookUrl"
          type="url"
          value={facebookUrl}
          onChange={(e) => setFacebookUrl(e.target.value)}
          placeholder="Enter Facebook page URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instagramUrl">Instagram URL</Label>
        <Input
          id="instagramUrl"
          type="url"
          value={instagramUrl}
          onChange={(e) => setInstagramUrl(e.target.value)}
          placeholder="Enter Instagram profile URL"
        />
      </div>
    </div>
  );
};