import { NextRequest} from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
    const input = searchParams.get('input');
  if (!input) {
   return new Response(JSON.stringify({ error: 'No input provided!' }), {
    headers: { "Content-Type": "application/json" },
  });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // store your key in env vars
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    input
  )}&inputtype=textquery&fields=place_id,formatted_address,name,geometry&key=${apiKey}`;


  try {

    // get the place_id using address:
    const response = await fetch(url);
    const place = await response.json();
    const place_id = place["candidates"][0].place_id

    if (!place_id) {
      throw Error('Place id not found!')
    }

    // now searching using place_id for more details about the place:

      const fields = 'name,rating,formatted_phone_number,formatted_address,opening_hours,website,geometry'; // adjust as needed
    const response2 = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${apiKey}`
    );

    const data = await response2.json()

    console.log('received place details data..', JSON.stringify(data))

    return new Response(JSON.stringify({ data: data }), {
    headers: { "Content-Type": "application/json" },
  });
  } catch (error) {
    console.error('Error fetching place data:', error);
   return new Response(JSON.stringify({ error: JSON.stringify(error) }), {
    headers: { "Content-Type": "application/json" },
  });
  }
}
