import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { RestaurantFormData } from "../types";

interface BookingSectionProps {
  form: UseFormReturn<RestaurantFormData>;
}

export const BookingSection = ({ form }: BookingSectionProps) => {
  const preferredBookingMethod = form.watch("preferredBookingMethod");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormLabel>Preferred Booking Method</FormLabel>
        <RadioGroup
          value={preferredBookingMethod}
          onValueChange={(value) => form.setValue("preferredBookingMethod", value)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <FormLabel htmlFor="phone">Phone</FormLabel>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="website" id="website" />
            <FormLabel htmlFor="website">Website</FormLabel>
          </div>
        </RadioGroup>
      </div>

      {preferredBookingMethod === 'website' && (
        <FormField
          control={form.control}
          name="bookingUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Booking URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Enter booking page URL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};