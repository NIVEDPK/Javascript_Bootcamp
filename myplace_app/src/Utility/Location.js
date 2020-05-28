const GOOGLE_API_KEY = "AIzaSyDsUlMo4SnR8JDFWaYG-AmRn1SzfDWhM6M";
export async function getCoordsFromAddress(address) {
  const addr = encodeURI(address);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coordinates from api");
  }
  const data = await response.json();

  if (data.error_message) {
    throw new error(data.error_message);
  }

  console.log(data);
  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

export async function getAddressFromCords(coords) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch address from api");
  }
  const data = await response.json();

  if (data.error_message) {
    throw new error(data.error_message);
  }

  console.log(data);
  const address = data.results[0].formatted_address;

  return address;
}
