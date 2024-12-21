import { Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketingAdvisorSectionProps {
  onMarketingAdvice: () => void;
}

export const MarketingAdvisorSection = ({ onMarketingAdvice }: MarketingAdvisorSectionProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto mb-8 md:mb-12">
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
        <Bot className="h-6 w-6 md:h-8 md:w-8 text-[#E94E87]" />
        <h2 className="text-xl md:text-2xl font-bold">Try Our AI Booking Assistant</h2>
      </div>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Experience our AI-powered booking assistant that helps your customers schedule appointments, 
        answer questions about your business, and provide a seamless customer experience.
      </p>
      <Button
        onClick={onMarketingAdvice}
        className="bg-[#E94E87] hover:bg-[#E94E87]/90 text-white font-semibold w-full md:w-auto rounded-xl"
      >
        Chat with Booking Assistant
        <MessageSquare className="ml-2 h-4 w-4 md:h-5 md:w-5" />
      </Button>
    </div>
  );
};