import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface ContactSectionProps {
  websiteContent: {
    google_maps_url?: string;
    phone_number?: string;
    contact_email?: string;
  };
}

export const ContactSection = ({ websiteContent }: ContactSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-sm">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact & Location</h2>
        
        {websiteContent.google_maps_url && (
          <a 
            href={websiteContent.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
          >
            <MapPin className="h-5 w-5 text-primary" />
            <span>View on Google Maps</span>
          </a>
        )}

        {websiteContent.phone_number && (
          <a 
            href={`tel:${websiteContent.phone_number}`}
            className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5 text-primary" />
            <span>{websiteContent.phone_number}</span>
          </a>
        )}

        {websiteContent.contact_email && (
          <a 
            href={`mailto:${websiteContent.contact_email}`}
            className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
          >
            <Mail className="h-5 w-5 text-primary" />
            <span>{websiteContent.contact_email}</span>
          </a>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hours</h2>
        <div className="flex items-center gap-3 text-gray-600">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
            <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};