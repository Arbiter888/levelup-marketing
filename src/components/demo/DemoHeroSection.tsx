import { motion } from "framer-motion";
import { FeatureCards } from "./FeatureCards";
import { MarketingAdvisorSection } from "./MarketingAdvisorSection";

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
          Your Restaurant's Smart Online Presence
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto px-2"
        >
          Generate engaging email campaigns instantly, reward loyal customers automatically, and showcase your restaurant with a beautiful micro-website powered by AI reservations
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FeatureCards />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <MarketingAdvisorSection onMarketingAdvice={onSurveyDemo} />
        </motion.div>
      </div>
    </section>
  );
};