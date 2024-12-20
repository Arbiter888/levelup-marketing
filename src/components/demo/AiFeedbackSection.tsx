import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface AiFeedbackSectionProps {
  onTakeAiSurvey: () => void;
}

export const AiFeedbackSection = ({ onTakeAiSurvey }: AiFeedbackSectionProps) => {
  return (
    <div className="mt-12 text-center space-y-4 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-pink-100">
      <h3 className="text-xl font-semibold text-gray-800">
        Ready to make a reservation?
      </h3>
      <p className="text-gray-600">
        Chat with our AI reservations assistant to book your table and get instant answers to your questions.
      </p>
      <Button
        onClick={onTakeAiSurvey}
        className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] hover:opacity-90 text-white"
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Book Now with AI Assistant
      </Button>
    </div>
  );
};