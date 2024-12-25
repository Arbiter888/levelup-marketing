interface EmailContentProps {
  emailCopy: string;
  businessName?: string;
}

export const EmailContent = ({ emailCopy, businessName }: EmailContentProps) => {
  const subject = businessName ? 
    `Special Offer from ${businessName}` : 
    "Special Offer for You";

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200">
      <h3 className="font-semibold text-xl mb-4">Email Campaign Preview</h3>
      <div className="prose max-w-none space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium">Subject: {subject}</p>
        </div>
        <div 
          className="email-preview"
          dangerouslySetInnerHTML={{ __html: emailCopy }}
        />
      </div>
    </div>
  );
};