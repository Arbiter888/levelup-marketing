import { useState, useRef, useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { CreateReviewPageSection } from "@/components/sections/CreateReviewPageSection";
import { VdaSection } from "@/components/sections/VdaSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { ExampleReviews } from "@/components/ExampleReviews";
import { Footer } from "@/components/Footer";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const Index = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const experienceSectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkOnboardingStatus = async (userId: string) => {
    const { data: restaurants, error } = await supabase
      .from("restaurants")
      .select("id")
      .eq("owner_id", userId)
      .limit(1);

    if (error) {
      console.error("Error checking onboarding status:", error);
      return false;
    }

    return restaurants && restaurants.length > 0;
  };

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange(async (event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setShowAuthDialog(false);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome!",
            description: "You've successfully signed in.",
          });

          // Check if user has completed onboarding
          const hasCompletedOnboarding = await checkOnboardingStatus(session.user.id);
          
          if (!hasCompletedOnboarding) {
            toast({
              title: "Complete Your Registration",
              description: "Let's set up your restaurant profile.",
            });
            navigate("/restaurants/onboard");
          } else {
            navigate("/restaurants/dashboard");
          }
        }
      }
    });

    if (showWidget) {
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showWidget, toast, navigate]);

  const scrollToExperience = () => {
    navigate("/demo");
  };

  const handleSurveyCallClick = () => {
    setShowWidget(!showWidget);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate("/restaurants/dashboard");
    } else {
      setShowAuthDialog(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="absolute top-4 right-4 z-10">
          <Button 
            onClick={handleAuthClick}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm hover:bg-white/70"
          >
            <Building2 className="mr-2 h-5 w-5" />
            {isAuthenticated ? "View Dashboard" : "Restaurant Sign In"}
          </Button>
        </div>
        <HeroSection onTryDemo={scrollToExperience} onShowAuth={() => setShowAuthDialog(true)} />
        <FeaturesSection />
        <CreateReviewPageSection onShowAuth={() => setShowAuthDialog(true)} />
        <VdaSection />
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
              Restaurant Success Stories
            </h2>
            <ExampleReviews />
          </div>
        </section>
        <CtaSection onTryDemo={scrollToExperience} />
      </div>
      <Footer />

      {showWidget && (
        <div className="fixed bottom-0 right-0 z-[9999] min-w-[320px]">
          <div className="relative">
            <elevenlabs-convai agent-id="CI0HSZaVDE1uT881ruiq"></elevenlabs-convai>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-black rounded-full" />
          </div>
        </div>
      )}

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center mb-4">Welcome to levelUP! 🚀</DialogTitle>
          </DialogHeader>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#E94E87',
                    brandAccent: '#D13D73',
                  },
                },
              },
            }}
            providers={[]}
            theme="light"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
