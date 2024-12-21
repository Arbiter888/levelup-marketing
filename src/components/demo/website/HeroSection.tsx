import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

interface HeroSectionProps {
  businessName: string;
  onBookTable: () => void;
  businessDescription?: string;
}

export const HeroSection = ({ businessName, onBookTable, businessDescription }: HeroSectionProps) => {
  return (
    <div className="relative h-[300px] bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{businessName}</h1>
        {businessDescription && (
          <p className="text-lg opacity-90 max-w-2xl">{businessDescription}</p>
        )}
        <div className="mt-8 space-y-4">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 flex items-center gap-2"
            onClick={onBookTable}
          >
            <Bot className="w-5 h-5" />
            Chat with our AI Assistant
          </Button>
          <p className="text-sm text-white/80 max-w-md">
            Our AI assistant is available 24/7 to help answer your questions
          </p>
        </div>
      </div>
    </div>
  );
};