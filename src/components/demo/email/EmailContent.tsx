interface EmailContentProps {
  emailCopy: string;
}

export const EmailContent = ({ emailCopy }: EmailContentProps) => {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200">
      <h3 className="font-semibold text-xl mb-4">Email Campaign Preview</h3>
      <div className="prose max-w-none space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium">Subject: Special Offer from Our Restaurant</p>
        </div>
        <div 
          className="email-preview"
          dangerouslySetInnerHTML={{ __html: emailCopy }}
        />
      </div>
    </div>
  );
};