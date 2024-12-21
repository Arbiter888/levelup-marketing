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
          src="/lovable-uploads/1488590528505-98d2b5aba04b.png"
          alt="Modern business technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#FFE5ED]/80 to-[#FFD5E2]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6 md:mb-8"
        >
          Welcome to levelUP! 🚀
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] text-transparent bg-clip-text px-6 md:px-12 leading-tight pb-1"
        >
          Your Business's Smart Online Presence
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto px-2"
        >
          Generate engaging email campaigns instantly, reward loyal customers automatically, and showcase your business with a beautiful micro-website powered by AI
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