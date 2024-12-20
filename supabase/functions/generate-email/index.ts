import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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

    let photoSection = '';
    if (promoPhotos?.length > 0) {
      photoSection = `
        <div class="photo-grid">
          ${promoPhotos.map((photo: { url: string, dishName: string }) => `
            <div class="dish-photo">
              <img src="${photo.url}" alt="${photo.dishName}" style="width: 100%; height: auto;">
              <p class="dish-caption">${photo.dishName}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    const emailCopy = `
      <div>
        <p>Dear Food Lover,</p>
        
        <p>${promotion}</p>

        ${photoSection}
        
        ${uniqueReward ? `
          <div class="reward-section">
            <p><b>Special Offer for You!</b></p>
            <p>${uniqueReward}</p>
            <p class="reward-code">${uniqueCode}</p>
            <p><small>Show this code when dining with us</small></p>
          </div>
        ` : ''}

        <div class="divider"></div>

        <div class="contact-section">
          <h3 style="margin-top: 0;">${restaurantName}</h3>
          
          ${phoneNumber ? `<p>📞 <a href="tel:${phoneNumber}">${phoneNumber}</a></p>` : ''}
          ${googleMapsUrl ? `<p>📍 <a href="${googleMapsUrl}" target="_blank">Find us on Google Maps</a></p>` : ''}
          
          <div class="social-links">
            ${websiteUrl ? `<a href="${websiteUrl}" target="_blank">🌐 Website</a>` : ''}
            ${facebookUrl ? `<a href="${facebookUrl}" target="_blank">👥 Facebook</a>` : ''}
            ${instagramUrl ? `<a href="${instagramUrl}" target="_blank">📸 Instagram</a>` : ''}
          </div>
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