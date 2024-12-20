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

    const systemMessage = `You are an expert email marketing copywriter for restaurants. 
    Create an engaging email that highlights special offers and menu items. 
    Use a friendly, inviting tone and include clear calls-to-action.
    Format the response for email clients with proper spacing and sections.
    Include the unique code: ${uniqueCode}
    Keep paragraphs short and use spacing for readability.
    Do not use asterisks or markdown formatting.
    Create content that looks like a proper email, not a document.`

    let userMessage = `Create an email marketing message for ${restaurantName} with this promotion: ${promotion}.`;
    if (menuUrl) {
      userMessage += ` The restaurant has provided their menu for reference.`;
    }
    if (promoPhotos?.length > 0) {
      userMessage += ` They've also provided ${promoPhotos.length} appetizing food photos to include.`;
    }

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
    let emailCopy = data.choices[0].message.content

    // Add photo HTML if photos are provided
    if (promoPhotos?.length > 0) {
      const photoHtml = promoPhotos.map((photo: string) => 
        `<img src="${photo}" alt="Food at ${restaurantName}" style="max-width: 300px; height: auto; margin: 10px 0; border-radius: 8px;">`
      ).join('\n')
      emailCopy += `\n\n${photoHtml}`
    }

    return new Response(
      JSON.stringify({ emailCopy, uniqueCode }),
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