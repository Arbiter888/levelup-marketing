import { Button } from "@/components/ui/button";
import { MessageSquare, LogIn, Star, Gift, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface HeroSectionProps {
  onTryDemo: () => void;
  onShowAuth: () => void;
}

export const HeroSection = ({ onTryDemo, onShowAuth }: HeroSectionProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate("/businesses/dashboard");
    } else {
      onShowAuth();
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-white via-[#FFE5ED] to-[#FFD5E2]/20">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/lovable-uploads/1498050108023-c5249f4df085"
          alt="Modern business workspace"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 text-center relative">
        <div className="w-full flex justify-center mb-8">
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="levelUP! Logo" 
            className="h-20 md:h-28 w-auto hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="text-[#1a1060] text-2xl md:text-3xl font-bold mb-2">
          ENGAGE. EARN. GROW.
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-transparent bg-clip-text px-6 md:px-12 leading-tight pb-1">
          Transform Your Business's Online Strategy
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Boost customer engagement, increase retention, and gather actionable feedback with our innovative AI-powered platform.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 fade-in glass-card">
            <div className="flex justify-center mb-4">
              <Star className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Review Acceleration</h3>
            <p className="text-gray-600 text-sm">
              Turn happy customers into brand advocates with AI-enhanced review generation and instant reward incentives
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 fade-in glass-card">
            <div className="flex justify-center mb-4">
              <Gift className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Customer Rewards</h3>
            <p className="text-gray-600 text-sm">
              Drive customer loyalty with our 4-visit reward program, turning first-time visitors into regular customers
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 fade-in glass-card">
            <div className="flex justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Customer Survey</h3>
            <p className="text-gray-600 text-sm">
              Free up staff time with our AI-powered voice feedback system that captures detailed customer insights
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto mb-12 glass-card">
          <div className="flex justify-center mb-4">
            <MessageCircle className="h-10 w-10 text-pink-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">levelUP! AI Customer Survey</h3>
          <p className="text-gray-600 mb-6">
            Experience our conversational AI that engages customers in natural dialogue, gathering comprehensive feedback about their experience while your staff focuses on service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={onTryDemo}
              className="bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
              size="lg"
            >
              <MessageSquare className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Try AI Survey Demo
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={handleAuthClick}
              className="border-[#D946EF] text-[#D946EF] hover:bg-[#D946EF] hover:text-white w-full sm:w-auto"
            >
              <LogIn className="mr-2 h-5 w-5" />
              {isAuthenticated ? "View Dashboard" : "Sign In / Register"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};