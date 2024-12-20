export const constructRewardEmailBody = (
  businessName: string,
  googleMapsUrl: string,
  uniqueCode: string | null,
  review: string,
) => {
  const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Dear Food Lover,</h2>
      
      <p>Thank you for dining at ${businessName}! We're excited to share your experience:</p>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-style: italic;">${review}</p>
      </div>
      
      <h3 style="color: #E94E87;">Contact Information</h3>
      <p>
        📍 <a href="${googleMapsUrl}" style="color: #E94E87; text-decoration: none;">Get Directions</a><br>
        📞 Call to Book: ${googleMapsUrl ? 'Available on Google Maps' : 'Contact restaurant directly'}<br>
        🌐 More Details: ${googleMapsUrl}
      </p>
      
      <hr style="border: 1px solid #eee; margin: 20px 0;">
      
      <p style="color: #666; font-size: 14px;">
        Looking forward to serving you again!<br>
        Best regards,<br>
        ${businessName} Team
      </p>
    </div>
  `;

  return emailBody;
};

export const getEmailRecipients = () => {
  const defaultRecipient = 'preview@eatup.co';
  const recipients = [defaultRecipient];
  
  try {
    const savedPreferences = localStorage.getItem('demoPreferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      if (preferences.contactEmail && preferences.contactEmail.trim()) {
        recipients.push(preferences.contactEmail.trim());
      }
    }
  } catch (error) {
    console.error('Error getting email recipients:', error);
  }
  
  return recipients.join(',');
};