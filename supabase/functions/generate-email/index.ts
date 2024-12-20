import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { nanoid } from 'https://esm.sh/nanoid@5.0.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { 
      promotion, 
      menuUrl, 
      promoPhotos, 
      restaurantName,
      websiteUrl,
      facebookUrl,
      instagramUrl,
      phoneNumber,
      bookingUrl,
      preferredBookingMethod,
      googleMapsUrl
    } = await req.json()

    // Generate a unique code for the preview
    const uniqueCode = nanoid(8);

    // Create image HTML if photos are provided
    const photoHtml = promoPhotos?.length > 0 
      ? promoPhotos.map((photo: string) => 
          `<img src="${photo}" alt="Food at ${restaurantName}" style="max-width: 300px; height: auto; margin: 10px 0; border-radius: 8px;">`
        ).join('\n')
      : '';

    // Construct social media and contact section
    let socialAndContactInfo = '\n\nConnect with us:';
    if (websiteUrl) socialAndContactInfo += `\n• Visit our website: ${websiteUrl}`;
    if (facebookUrl) socialAndContactInfo += `\n• Follow us on Facebook: ${facebookUrl}`;
    if (instagramUrl) socialAndContactInfo += `\n• Follow us on Instagram: ${instagramUrl}`;
    
    // Add booking information
    let bookingInfo = '\n\nMake a reservation:';
    if (preferredBookingMethod === 'phone' && phoneNumber) {
      bookingInfo += `\n• Call us at: ${phoneNumber}`;
    } else if (preferredBookingMethod === 'website' && bookingUrl) {
      bookingInfo += `\n• Book online: ${bookingUrl}`;
    }

    // Add Google Maps link
    const locationInfo = `\n\nFind us:\n• Visit us on Google Maps: ${googleMapsUrl}`;

    const systemMessage = `You are an expert email marketing copywriter for restaurants. 
    Create an engaging, plain-text email that highlights special offers and menu items. 
    Use a friendly, inviting tone and include clear calls-to-action.
    Format the response for email clients (no HTML).
    Include the unique code: ${uniqueCode}
    Include the provided social media links, booking information, and location details at the bottom of the email.
    Keep paragraphs short and use spacing for readability.`

    let userMessage = `Create an email marketing message for ${restaurantName} with this promotion: ${promotion}.`;
    if (menuUrl) {
      userMessage += ` The restaurant has provided their menu for reference.`;
    }
    if (promoPhotos?.length > 0) {
      userMessage += ` They've also provided ${promoPhotos.length} appetizing food photos to include.`;
    }
    userMessage += `\n\nInclude these sections at the bottom of the email:${socialAndContactInfo}${bookingInfo}${locationInfo}`;
    userMessage += `\n\nMake sure to include:\n1. An attention-grabbing subject line\n2. The promotion details\n3. Terms and conditions (valid for 7 days)\n4. Clear redemption instructions using the code: ${uniqueCode}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
      }),
    })

    const data = await response.json()
    const emailCopy = data.choices[0].message.content

    // Add the photos to the email copy
    const emailWithPhotos = photoHtml ? `${emailCopy}\n\n${photoHtml}` : emailCopy

    return new Response(
      JSON.stringify({ emailCopy: emailWithPhotos, uniqueCode }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error in generate-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      },
    )
  }
})