import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

const exampleReviews = [
  {
    text: "The ambiance was perfect for our anniversary dinner. The wagyu steak was cooked to perfection, and the wine pairing suggested by the sommelier was exceptional. The service was attentive without being intrusive.",
    author: "Sarah Martinez",
    role: "Dinner Guest",
    rating: 5,
    visitDate: "March 15, 2024",
    visitType: "Special Occasion",
    image: "/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
  },
  {
    text: "Had a fantastic business lunch here. The prix fixe menu offers great value, and the service is quick without compromising quality. The grilled sea bass was a standout dish.",
    author: "John Davidson",
    role: "Business Lunch",
    rating: 5,
    visitDate: "March 10, 2024",
    visitType: "Business Meal",
    image: "/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
  },
  {
    text: "Sunday brunch here is a must-try! The eggs Benedict with house-cured salmon was incredible, and the bottomless mimosas were perfectly balanced. Great atmosphere for a weekend gathering.",
    author: "Michael Rodriguez",
    role: "Brunch Guest",
    rating: 5,
    visitDate: "March 3, 2024",
    visitType: "Weekend Brunch",
    image: "/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
  },
  {
    text: "The tasting menu was an incredible culinary journey. Each course was beautifully presented and the flavors were perfectly balanced. The sommelier's wine pairings elevated the experience.",
    author: "Emily Wong",
    role: "Fine Dining Guest",
    rating: 5,
    visitDate: "February 28, 2024",
    visitType: "Tasting Menu Experience",
    image: "/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
  },
];

export const ExampleReviews = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {exampleReviews.map((review, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <div className="glass-card h-full p-6 rounded-2xl space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={review.image}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-secondary">{review.author}</p>
                    <p className="text-sm text-muted-foreground">{review.visitType}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-primary/20" />
                <p className="text-secondary/80 leading-relaxed">{review.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.visitDate}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white" />
          <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white" />
        </div>
      </Carousel>
    </div>
  );
};