import { Bot, Globe, Calendar } from "lucide-react";

export const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-center mb-4">
          <Globe className="h-8 w-8 text-[#E94E87]" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Beautiful Micro-Website</h3>
        <p className="text-sm text-muted-foreground">
          Create a stunning, mobile-friendly micro-website that showcases your restaurant's unique personality and offerings
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-center mb-4">
          <Bot className="h-8 w-8 text-[#E94E87]" />
        </div>
        <h3 className="text-lg font-semibold mb-2">AI Reservations Agent</h3>
        <p className="text-sm text-muted-foreground">
          Integrate our AI-powered reservations assistant that helps customers book tables and answers questions 24/7
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-center mb-4">
          <Calendar className="h-8 w-8 text-[#E94E87]" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Smart Booking System</h3>
        <p className="text-sm text-muted-foreground">
          Let customers easily make reservations through your preferred booking method, enhanced by AI assistance
        </p>
      </div>
    </div>
  );
};