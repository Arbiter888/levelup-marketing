interface LocationPreviewProps {
  googleMapsUrl: string;
}

export const LocationPreview = ({ googleMapsUrl }: LocationPreviewProps) => {
  // Extract the place ID or coordinates from the Google Maps URL
  const getEmbedUrl = (url: string) => {
    const placeIdMatch = url.match(/place\/([^\/]+)/);
    if (placeIdMatch) {
      return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:${placeIdMatch[1]}`;
    }
    return url.replace(/\/(maps\/)?(@|place\/)?/, '/maps/embed/v1/place?key=YOUR_API_KEY&q=');
  };

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={getEmbedUrl(googleMapsUrl)}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};