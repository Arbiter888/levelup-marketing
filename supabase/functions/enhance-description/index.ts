import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description } = await req.json();
    console.log('Received description:', description);

    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    if (!description || description.trim().length === 0) {
      throw new Error('Description is required');
    }

    console.log('Making request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional business writer. Your task is to enhance the given business description while maintaining its core information and unique characteristics. Keep the same type of business and key details, but make it more engaging and professional. The output should be concise (2-3 sentences) and maintain the original business type and key offerings.'
          },
          {
            role: 'user',
            content: `Please enhance this business description while keeping its core identity and type: ${description}`
          }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI API response:', data);

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get response from OpenAI');
    }

    const enhancedText = data.choices[0].message.content;
    console.log('Enhanced text:', enhancedText);

    return new Response(JSON.stringify({ enhancedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enhance-description function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.toString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});