import { Card } from "@/components/ui/card";

interface RestaurantHeaderProps {
  name: string;
  isCustomDemo?: boolean;
}

export const RestaurantHeader = ({ name, isCustomDemo = false }: RestaurantHeaderProps) => {
  if (isCustomDemo) {
    return (
      <div className="flex flex-col items-center space-y-4 mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-primary text-center">
          Leave a Review for {name}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 mb-8 md:mb-12">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
          Create Marketing Campaigns in Minutes
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-2">
          Experience How levelUP! Helps You Connect with Your Customers
        </p>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Generate professional marketing campaigns with AI in under a minute. Showcase your products, promote special offers, and drive repeat visits with beautifully crafted emails. Try our demo to see how easy it is to create engaging content that keeps your customers coming back.
        </p>
      </div>
    </div>
  );
};