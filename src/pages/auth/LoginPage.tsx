import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome!",
            description: "You've successfully signed in.",
          });
        }
      }
    });
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFE5ED] to-[#FFD5E2]/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <img 
            src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
            alt="levelUP! Logo" 
            className="h-16 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-secondary mb-2">Welcome to levelUP!</h1>
          <p className="text-muted-foreground">Sign in to manage your email campaigns</p>
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

<lov-write file_path="src/pages/dashboard/EmailListsPage.tsx">
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailList {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export default function EmailListsPage() {
  const [emailLists, setEmailLists] = useState<EmailList[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchEmailLists();
  }, []);

  const fetchEmailLists = async () => {
    const { data: lists, error } = await supabase
      .from("email_lists")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch email lists",
        variant: "destructive",
      });
      return;
    }

    setEmailLists(lists);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Email Lists</h1>
        <Button onClick={() => navigate("/dashboard/lists/new")}>
          <Plus className="mr-2 h-4 w-4" /> Create New List
        </Button>
      </div>

      <div className="grid gap-4">
        {emailLists.map((list) => (
          <div
            key={list.id}
            className="bg-white p-6 rounded-lg shadow-sm border hover:border-primary/50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{list.name}</h3>
            {list.description && (
              <p className="text-muted-foreground mb-4">{list.description}</p>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/dashboard/lists/${list.id}`)}
              >
                View Contacts
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/dashboard/lists/${list.id}/send`)}
              >
                Send Email
              </Button>
            </div>
          </div>
        ))}

        {emailLists.length === 0 && (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No Email Lists Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first email list to get started
            </p>
            <Button onClick={() => navigate("/dashboard/lists/new")}>
              <Plus className="mr-2 h-4 w-4" /> Create New List
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}