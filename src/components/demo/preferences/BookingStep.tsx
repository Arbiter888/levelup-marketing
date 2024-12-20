import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BookingStepProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  bookingUrl: string;
  setBookingUrl: (value: string) => void;
  preferredBookingMethod: string;
  setPreferredBookingMethod: (value: string) => void;
}

export const BookingStep = ({
  phoneNumber,
  setPhoneNumber,
  bookingUrl,
  setBookingUrl,
  preferredBookingMethod,
  setPreferredBookingMethod,
}: BookingStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter contact phone number"
        />
      </div>

      <div className="space-y-2">
        <Label>Preferred Booking Method</Label>
        <RadioGroup
          value={preferredBookingMethod}
          onValueChange={setPreferredBookingMethod}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone">Phone</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="website" id="website" />
            <Label htmlFor="website">Website</Label>
          </div>
        </RadioGroup>
      </div>

      {preferredBookingMethod === 'website' && (
        <div className="space-y-2">
          <Label htmlFor="bookingUrl">Booking URL</Label>
          <Input
            id="bookingUrl"
            type="url"
            value={bookingUrl}
            onChange={(e) => setBookingUrl(e.target.value)}
            placeholder="Enter booking page URL"
          />
        </div>
      )}
    </div>
  );
};