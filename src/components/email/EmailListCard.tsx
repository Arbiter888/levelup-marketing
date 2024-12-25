import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactUploadDialog } from "./ContactUploadDialog";

interface EmailListCardProps {
  list: {
    id: string;
    name: string;
    description: string | null;
  };
  onContactsUploaded: () => void;
}

export const EmailListCard = ({ list, onContactsUploaded }: EmailListCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{list.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {list.description && (
          <p className="text-sm text-gray-600 mb-4">{list.description}</p>
        )}
        <ContactUploadDialog listId={list.id} onContactsUploaded={onContactsUploaded} />
      </CardContent>
    </Card>
  );
};