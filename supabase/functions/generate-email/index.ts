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
    Format the response with proper HTML tags for email clients.
    Keep paragraphs short and use proper spacing.
    Do not include any contact information or social links - these will be added separately.
    Do not mention the unique code - it will be added separately.
    Focus only on the promotional content and menu highlights.
    Use <b> tags for emphasis, not asterisks.
    Keep the content concise and focused on the promotion.`

    let userMessage = `Create an email marketing message for ${restaurantName} with this promotion: ${promotion}.`;
    if (menuUrl) {
      userMessage += ` The restaurant has provided their menu for reference.`;
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
      emailCopy += '\n\n<div style="margin: 2rem 0; text-align: center;">'
      emailCopy += promoPhotos.map((photo: string) => 
        `<img src="${photo}" alt="Food at ${restaurantName}" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px;">`
      ).join('\n')
      emailCopy += '</div>'
    }

    // Add a clear divider
    emailCopy += '\n\n<hr style="border: none; border-top: 2px solid #f0f0f0; margin: 2rem 0;">'

    // Add contact information and social links
    let contactSection = `<div class="contact-section" style="margin-top: 2rem; padding: 1.5rem; background-color: #f8f9fa; border-radius: 8px;">`
    contactSection += `<h3 style="color: #333; margin-bottom: 1rem; font-size: 1.5rem;">Visit ${restaurantName}</h3>`
    
    if (phoneNumber) {
      contactSection += `<p style="margin: 0.75rem 0;"><span style="color: #E94E87;">📞</span> <a href="tel:${phoneNumber}" style="color: #E94E87; text-decoration: none;">Call to Book: ${phoneNumber}</a></p>`
    }
    
    if (googleMapsUrl) {
      contactSection += `<p style="margin: 0.75rem 0;"><span style="color: #E94E87;">📍</span> <a href="${googleMapsUrl}" target="_blank" style="color: #E94E87; text-decoration: none;">Find us on Google Maps</a></p>`
    }

    // Add booking information
    if (preferredBookingMethod === 'website' && bookingUrl) {
      contactSection += `<p style="margin: 0.75rem 0;"><span style="color: #E94E87;">🗓️</span> <a href="${bookingUrl}" target="_blank" style="color: #E94E87; text-decoration: none;">Book a Table Online</a></p>`
    }

    // Add social media links if available
    if (websiteUrl || facebookUrl || instagramUrl) {
      contactSection += '<div style="margin-top: 1rem; display: flex; gap: 1rem; flex-wrap: wrap;">'
      if (websiteUrl) {
        contactSection += `<a href="${websiteUrl}" target="_blank" style="color: #E94E87; text-decoration: none;">🌐 Website</a>`
      }
      if (facebookUrl) {
        contactSection += `<a href="${facebookUrl}" target="_blank" style="color: #E94E87; text-decoration: none;">📱 Facebook</a>`
      }
      if (instagramUrl) {
        contactSection += `<a href="${instagramUrl}" target="_blank" style="color: #E94E87; text-decoration: none;">📸 Instagram</a>`
      }
      contactSection += '</div>'
    }

    // Add unique code reminder in a styled box
    contactSection += `
      <div style="margin-top: 1.5rem; padding: 1.5rem; background-color: #fff; border-radius: 8px; border: 2px dashed #E94E87;">
        <h4 style="color: #E94E87; margin: 0 0 0.75rem 0; font-size: 1.2rem;">Your Special Reward Code</h4>
        <p style="font-family: monospace; font-size: 1.5rem; font-weight: bold; color: #333; margin: 0.5rem 0;">${uniqueCode}</p>
        <p style="color: #666; font-size: 0.9rem; margin: 0.5rem 0;">Show this code to your server on your next visit to receive your special reward!</p>
      </div>
    `
    
    contactSection += '</div>'
    emailCopy += contactSection

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