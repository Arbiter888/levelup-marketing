import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { MicroWebsite } from "./MicroWebsite";
import { Footer } from "@/components/Footer";

interface CustomDemoViewProps {
  slug: string;
}

export const CustomDemoView = ({ slug }: CustomDemoViewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWebsite = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurant_websites')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (!data) {
          navigate('/');
        }
      } catch (err) {
        console.error('Error loading website:', err);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadWebsite();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <MicroWebsite slug={slug} />
      </div>
      <Footer />
    </div>
  );
};