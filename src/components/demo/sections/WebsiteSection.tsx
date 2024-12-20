import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { RestaurantFormData } from "../types";

interface WebsiteSectionProps {
  form: UseFormReturn<RestaurantFormData>;
}

export const WebsiteSection = ({ form }: WebsiteSectionProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="websiteDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Restaurant Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter a description of your restaurant"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="websiteUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website URL</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="Enter your website URL"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};