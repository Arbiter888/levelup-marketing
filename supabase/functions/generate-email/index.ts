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
      promoPhotos, 
      restaurantName,
      websiteUrl,
      facebookUrl,
      instagramUrl,
      phoneNumber,
      bookingUrl,
      preferredBookingMethod,
      googleMapsUrl,
      uniqueReward
    } = await req.json()

    const uniqueCode = nanoid(8);

    const systemMessage = `You are an expert email marketing copywriter for restaurants. 
    Create a concise, engaging promotional email that highlights the special offers and menu items.
    
    Important formatting rules:
    1. Start with "Dear Food Lover," on its own line
    2. Add a blank line after the greeting
    3. Write in plain text with proper paragraph breaks
    4. Keep paragraphs short and focused (2-3 sentences max)
    5. Don't include any HTML tags or formatting instructions
    6. Don't mention contact information or social links
    7. Don't include the unique code
    8. Focus on the promotional content
    9. Keep the content brief and engaging (max 3-4 paragraphs)
    10. Use proper spacing between paragraphs
    11. Don't use asterisks or other special characters`;

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
          { role: 'user', content: `Create a brief, focused email marketing message for ${restaurantName} with this promotion: ${promotion}` }
        ],
      }),
    })

    const data = await response.json()
    console.log('OpenAI response:', data);
    
    let emailCopy = '<div style="margin-bottom: 2rem; line-height: 1.6; color: #333333;">';
    emailCopy += data.choices[0].message.content.replace(/\n/g, '<br>');
    emailCopy += '</div>';

    if (uniqueReward) {
      emailCopy += `
        <div style="margin: 2rem 0; padding: 1rem; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
          <p style="color: #E94E87; font-weight: bold; margin-bottom: 0.5rem;">Special Reward for Your Next Visit!</p>
          <p style="margin: 0;">${uniqueReward}</p>
          <p style="color: #666; font-size: 0.9rem; margin-top: 0.5rem;">Show code: ${uniqueCode}</p>
        </div>
      `;
    }

    if (promoPhotos?.length > 0) {
      emailCopy += '\n\n<div style="margin: 2rem 0; text-align: center;">';
      emailCopy += promoPhotos.map((photo: string) => 
        `<img src="${photo}" alt="Food at ${restaurantName}" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px;">`
      ).join('\n');
      emailCopy += '</div>';
    }

    emailCopy += `
      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 1.5rem; margin-top: 2rem;">
        <h3 style="color: #333; margin: 0 0 1rem 0; font-size: 1.5rem;">${restaurantName}</h3>
        
        <div style="margin: 0.5rem 0;">
          ${phoneNumber ? 
            `<p style="margin: 0.5rem 0;"><a href="tel:${phoneNumber}" style="color: #E94E87; text-decoration: none;">📞 ${phoneNumber}</a></p>` 
            : ''}
          ${googleMapsUrl ? 
            `<p style="margin: 0.5rem 0;"><a href="${googleMapsUrl}" target="_blank" style="color: #E94E87; text-decoration: none;">📍 Find us on Google Maps</a></p>`
            : ''}
        </div>

        ${(websiteUrl || facebookUrl || instagramUrl) ? 
          `<div style="margin: 1rem 0;">
            ${websiteUrl ? `<a href="${websiteUrl}" target="_blank" style="color: #666; text-decoration: underline; margin-right: 1rem;">🌐 Visit our Website</a>` : ''}
            ${facebookUrl ? `<a href="${facebookUrl}" target="_blank" style="color: #666; text-decoration: underline; margin-right: 1rem;">👥 Follow us on Facebook</a>` : ''}
            ${instagramUrl ? `<a href="${instagramUrl}" target="_blank" style="color: #666; text-decoration: underline;">📸 Follow us on Instagram</a>` : ''}
          </div>`
          : ''}
      </div>
    `;

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