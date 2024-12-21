import { useState } from "react";
import { Building2 } from "lucide-react";
import { CreateDemoButton } from "./CreateDemoButton";
import { PreviewSection } from "./PreviewSection";

interface ReviewPageCreationSectionProps {
  restaurantName: string | null;
  googleMapsUrl: string | null;
}

export const ReviewPageCreationSection = ({ restaurantName, googleMapsUrl }: ReviewPageCreationSectionProps) => {
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="md:sticky md:top-24 space-y-4 md:space-y-6 bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-pink-100">
        <div className="text-center space-y-3 md:space-y-4">
          <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
            <Building2 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Create Your Business's Micro-Website
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Get started with your own personalized micro-website. Perfect for businesses looking to showcase their products and services online.
          </p>
          <div className="space-y-4 text-left border-t border-gray-100 pt-4 mt-4">
            <h3 className="font-semibold text-gray-800">What You'll Get:</h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="font-semibold text-primary">1.</span>
                A custom-branded micro-website for your business
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary">2.</span>
                Your own levelUP! URL to share with customers
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary">3.</span>
                Integrated AI agent for 24/7 customer inquiries
              </li>
            </ol>
          </div>
        </div>

        <CreateDemoButton onPageCreated={setGeneratedUrl} />
        
        <PreviewSection 
          restaurantName={restaurantName}
          googleMapsUrl={googleMapsUrl}
          generatedUrl={generatedUrl}
        />
      </div>
    </div>
  );
};