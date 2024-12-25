import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContactUploadDialog = ({ listId, onContactsUploaded }: { listId: string; onContactsUploaded: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const text = await file.text();
      const rows = text.split('\n');
      const contacts = rows.slice(1).map(row => {
        const [email, firstName, lastName] = row.split(',').map(field => field.trim());
        return {
          list_id: listId,
          email,
          first_name: firstName,
          last_name: lastName
        };
      }).filter(contact => contact.email);

      const { error } = await supabase
        .from("email_contacts")
        .insert(contacts);

      if (error) throw error;

      toast({
        title: "Contacts uploaded",
        description: `Successfully uploaded ${contacts.length} contacts`,
      });
      setIsOpen(false);
      onContactsUploaded();
    } catch (error) {
      console.error("Error uploading contacts:", error);
      toast({
        title: "Error",
        description: "Failed to upload contacts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Contacts
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Contacts</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Upload a CSV file with the following columns: email, first name, last name
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary/90"
          />
          {isUploading && <p className="text-sm text-gray-600">Uploading...</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};