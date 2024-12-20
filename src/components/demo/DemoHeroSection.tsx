import { motion } from "framer-motion";
import { Bot, Mail, Gift, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoHeroSectionProps {
  onSurveyDemo: () => void;
}

export const DemoHeroSection = ({ onSurveyDemo }: DemoHeroSectionProps) => {
  return (
    <section className="relative py-12 md:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/lovable-uploads/022207d7-8d69-4714-9c28-702011f6f8f3.png"
          alt="Restaurant atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#FFE5ED]/80 to-[#FFD5E2]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center mb-6 md:mb-8"
        >
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="EatUP! Logo" 
            className="h-16 md:h-28 w-auto hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] text-transparent bg-clip-text px-6 md:px-12 leading-tight pb-1"
        >
          Transform Your Restaurant's Email Marketing
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto px-2"
        >
          Create engaging email campaigns that drive repeat visits, increase customer loyalty, and boost your restaurant's revenue
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12 px-2"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
            <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-3 md:mb-4">
              <Mail className="h-6 w-6 md:h-8 md:w-8 text-[#E94E87]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Instant Email Generation</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Create beautiful, engaging email campaigns with AI-powered content generation and professional templates
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
            <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-3 md:mb-4">
              <Gift className="h-6 w-6 md:h-8 md:w-8 text-[#E94E87]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Smart Reward System</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Include unique reward codes in your emails to track and boost conversion rates from your mailing list
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
            <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-3 md:mb-4">
              <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-[#E94E87]" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">AI Marketing Advisor</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Get personalized marketing advice and campaign suggestions from our AI advisor to maximize your email performance
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Bot className="h-6 w-6 md:h-8 md:w-8 text-[#E94E87]" />
            <h2 className="text-xl md:text-2xl font-bold">Try Our AI Marketing Advisor</h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            Get expert marketing advice tailored to your restaurant. Our AI advisor helps you create compelling offers, optimize email campaigns, and develop effective marketing strategies to boost customer engagement.
          </p>
          <Button
            onClick={onSurveyDemo}
            className="bg-[#E94E87] hover:bg-[#E94E87]/90 text-white font-semibold w-full md:w-auto rounded-xl"
          >
            Chat with Marketing Advisor
            <MessageSquare className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};