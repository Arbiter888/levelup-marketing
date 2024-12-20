import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Received request to generate email')
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

    console.log('Generating unique code')
    const uniqueCode = nanoid(8)

    let photoSection = ''
    if (promoPhotos?.length > 0) {
      photoSection = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 24px 0;">
          ${promoPhotos.map((photo: { url: string, dishName: string }) => `
            <div style="text-align: center;">
              <img 
                src="${photo.url}" 
                alt="${photo.dishName}" 
                style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;"
              >
              <p style="margin: 0; font-weight: 500; color: #4a5568;">${photo.dishName}</p>
            </div>
          `).join('')}
        </div>
      `
    }

    console.log('Generating email content')
    const emailCopy = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2d3748;">
        <p style="font-size: 16px; line-height: 1.6;">Dear Food Lover,</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 16px 0;">${promotion}</p>

        ${photoSection}
        
        ${uniqueReward ? `
          <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 24px 0; text-align: center;">
            <p style="font-size: 18px; font-weight: bold; color: #2d3748; margin: 0 0 16px 0;">Special Offer for You!</p>
            <p style="font-size: 16px; margin: 0 0 16px 0;">${uniqueReward}</p>
            <p style="font-family: monospace; font-size: 24px; font-weight: bold; color: #4a5568; background-color: #edf2f7; padding: 12px; border-radius: 4px; display: inline-block; margin: 0;">${uniqueCode}</p>
            <p style="font-size: 14px; color: #718096; margin: 16px 0 0 0;">Show this code when dining with us</p>
          </div>
        ` : ''}

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

        <div style="margin-top: 24px;">
          <h3 style="font-size: 20px; color: #2d3748; margin: 0 0 16px 0;">${restaurantName}</h3>
          
          ${phoneNumber ? `<p style="margin: 8px 0;"><span style="color: #718096;">📞</span> <a href="tel:${phoneNumber}" style="color: #4a5568; text-decoration: none;">${phoneNumber}</a></p>` : ''}
          ${googleMapsUrl ? `<p style="margin: 8px 0;"><span style="color: #718096;">📍</span> <a href="${googleMapsUrl}" target="_blank" style="color: #4a5568; text-decoration: none;">Find us on Google Maps</a></p>` : ''}
          
          <div style="margin-top: 16px;">
            ${websiteUrl ? `<a href="${websiteUrl}" target="_blank" style="color: #4a5568; text-decoration: none; margin-right: 16px;">🌐 Website</a>` : ''}
            ${facebookUrl ? `<a href="${facebookUrl}" target="_blank" style="color: #4a5568; text-decoration: none; margin-right: 16px;">👥 Facebook</a>` : ''}
            ${instagramUrl ? `<a href="${instagramUrl}" target="_blank" style="color: #4a5568; text-decoration: none;">📸 Instagram</a>` : ''}
          </div>
        </div>
      </div>
    `

    console.log('Email generated successfully')
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