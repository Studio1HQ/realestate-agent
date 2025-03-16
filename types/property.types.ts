export type Property = {
  Address: string; // property's address
  Rent: number; // for_sale or sold or other
  Beds: number; // house price
  Baths: number; // number of bedroom
  Type: string; // number of bathroom
  Area_in_sqft: number; // total land size in acres
  Rent_per_sqft: number; // street address
  Rent_category: string;
  Frequency: string;
  Furnishing: string;
  Purpose: string; //living space in square feet
  Posted_date: string; // previously sold date
  Age_of_listing_in_days: number
  Location: string
  City: string
  Latitude: number
  Longitude: number
  placeData?: any; // additional business data enriched by Places API
};
