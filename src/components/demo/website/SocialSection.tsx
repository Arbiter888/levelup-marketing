import { Globe, Facebook, Instagram } from "lucide-react";

interface SocialSectionProps {
  websiteContent: {
    website_url?: string;
    facebook_url?: string;
    instagram_url?: string;
  };
}

export const SocialSection = ({ websiteContent }: SocialSectionProps) => {
  return (
    <div className="flex justify-center gap-6">
      {websiteContent.website_url && (
        <a 
          href={websiteContent.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-primary transition-colors"
        >
          <Globe className="h-6 w-6" />
        </a>
      )}

      {websiteContent.facebook_url && (
        <a 
          href={websiteContent.facebook_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-primary transition-colors"
        >
          <Facebook className="h-6 w-6" />
        </a>
      )}

      {websiteContent.instagram_url && (
        <a 
          href={websiteContent.instagram_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-primary transition-colors"
        >
          <Instagram className="h-6 w-6" />
        </a>
      )}
    </div>
  );
};