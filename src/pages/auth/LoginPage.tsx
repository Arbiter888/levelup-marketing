import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth errors
    const handleAuthError = (event: CustomEvent<any>) => {
      if (event.detail?.error?.message === "User already registered") {
        toast({
          title: "Account already exists",
          description: "Please sign in with your existing account instead.",
          variant: "destructive",
        });
      }
    };

    // Add event listener for auth errors
    window.addEventListener("supabase.auth.error", handleAuthError as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener("supabase.auth.error", handleAuthError as EventListener);
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFE5ED] to-[#FFD5E2]/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="EatUP! Logo" 
            className="h-16 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-secondary mb-2">Welcome to EatUP!</h1>
          <p className="text-muted-foreground">Sign in to manage your restaurant reviews</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
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
        </div>
      </div>
    </div>
  );
}