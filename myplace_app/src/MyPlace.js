import { Map } from "./UI/Map";

class LoadedPlace {
  constructor(address, coords) {
    this.address = address;
    this.coords = coords;
    new Map(coords);
    const headerTitle = document.querySelector("header h1");
    headerTitle.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
  lat: parseFloat(queryParams.get("lat")),
  lng: +queryParams.get("lat"),
};
const address = queryParams.get("address");

console.log(queryParams);
console.log(coords);
new LoadedPlace(address, coords);
