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

    const uniqueCode = nanoid(8);

    const systemMessage = `You are an expert email marketing copywriter for restaurants. 
    Create a concise, engaging promotional email that highlights the special offers and menu items.
    
    Important formatting rules:
    1. Write in plain text without any HTML tags
    2. Use simple paragraphs with line breaks between them
    3. Keep paragraphs short and focused (2-3 sentences max)
    4. Don't include any formatting instructions or symbols
    5. Don't mention contact information or social links
    6. Don't include the unique code
    7. Focus only on the promotional content and menu highlights
    8. Keep the content brief and engaging (max 3-4 paragraphs)
    9. Don't include any calls to action
    10. Don't use asterisks or other special characters for emphasis`;

    let userMessage = `Create a brief, focused email marketing message for ${restaurantName} with this promotion: ${promotion}.`;
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
    console.log('OpenAI response:', data);
    
    // Process the raw text into properly formatted paragraphs
    const rawContent = data.choices[0].message.content;
    const paragraphs = rawContent.split('\n\n').filter(p => p.trim());
    
    // Convert paragraphs into styled divs
    let emailCopy = paragraphs.map(paragraph => 
      `<div style="margin-bottom: 1rem; line-height: 1.6; color: #333333;">${paragraph}</div>`
    ).join('\n');

    // Add photo section if photos are provided
    if (promoPhotos?.length > 0) {
      emailCopy += '\n\n<div style="margin: 2rem 0; text-align: center;">';
      emailCopy += promoPhotos.map((photo: string) => 
        `<img src="${photo}" alt="Food at ${restaurantName}" style="max-width: 100%; height: auto; margin: 1rem 0; border-radius: 8px;">`
      ).join('\n');
      emailCopy += '</div>';
    }

    // Add minimal contact section with reward code
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
            ${websiteUrl ? `<a href="${websiteUrl}" target="_blank" style="color: #666; text-decoration: none; margin-right: 1rem;">Website</a>` : ''}
            ${facebookUrl ? `<a href="${facebookUrl}" target="_blank" style="color: #666; text-decoration: none; margin-right: 1rem;">Facebook</a>` : ''}
            ${instagramUrl ? `<a href="${instagramUrl}" target="_blank" style="color: #666; text-decoration: none;">Instagram</a>` : ''}
          </div>`
          : ''}

        <div style="margin-top: 1rem; background-color: #fff; border: 2px dashed #E94E87; border-radius: 8px; padding: 1rem; text-align: center;">
          <p style="color: #E94E87; margin: 0 0 0.5rem 0; font-size: 0.9rem;">Your Special Reward Code</p>
          <p style="font-family: monospace; font-size: 1.2rem; font-weight: bold; color: #333; margin: 0;">${uniqueCode}</p>
        </div>
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