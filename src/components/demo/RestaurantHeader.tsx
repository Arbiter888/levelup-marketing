import { Card } from "@/components/ui/card";

interface RestaurantHeaderProps {
  name: string;
  isCustomDemo?: boolean;
}

export const RestaurantHeader = ({ name, isCustomDemo = false }: RestaurantHeaderProps) => {
  if (isCustomDemo) {
    return (
      <div className="flex flex-col items-center space-y-4 mb-8 md:mb-12">
        <img
          src="/lovable-uploads/9770ff21-86a3-477a-b98e-8264c81daf39.png"
          alt="Restaurant food spread"
          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-primary text-center">
          Leave a Review for {name}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8 md:mb-12">
      <img
        src="/lovable-uploads/9770ff21-86a3-477a-b98e-8264c81daf39.png"
        alt="Restaurant food spread"
        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full mx-auto md:mx-0"
      />
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
          Create Email Campaigns in Minutes
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-2">
          Experience How EatUP! Helps You Connect with Your Customers
        </p>
        <p className="text-sm text-muted-foreground max-w-lg">
          Generate professional email campaigns with AI in under a minute. Showcase your menu items, promote special offers, and drive repeat visits with beautifully crafted emails. Try our demo to see how easy it is to create engaging email content that keeps your customers coming back.
        </p>
      </div>
    </div>
  );
};