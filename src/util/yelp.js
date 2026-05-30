// src/util/yelp.js

async function searchBusinesses(term, location, sortBy) {

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/yelp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ term, location, sort_by: sortBy, limit: "20"}),
  });

  //Check if the response failed and throw an error if needed
  if(!res.ok) {
    throw new Error(`Yelp request failed (${res.status})`);
  }

  const data = await res.json();

  const businesses = data?.businesses.map(business => ({
    imageSrc: business?.image_url,
    name: business?.name,
    address: business?.location?.address1,
    city: business?.location?.city,
    state: business?.location?.state,
    zipCode: business?.location?.zip_code,
    category: business?.categories[0]?.title,
    rating: business?.rating,
    reviewCount: business?.review_count
  }))

  return businesses;
  
}

export default searchBusinesses;