import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CreateListDialog } from "@/components/email/CreateListDialog";
import { EmailListCard } from "@/components/email/EmailListCard";

export default function EmailListsPage() {
  const { data: lists, isLoading, refetch } = useQuery({
    queryKey: ["emailLists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_lists")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Email Lists</h1>
        
        <div className="mb-8">
          <CreateListDialog onListCreated={refetch} />
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-32 bg-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {lists?.map((list) => (
              <EmailListCard
                key={list.id}
                list={list}
                onContactsUploaded={refetch}
              />
            ))}
            {lists?.length === 0 && (
              <p className="text-center text-gray-600">
                No email lists yet. Create your first list to get started!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}