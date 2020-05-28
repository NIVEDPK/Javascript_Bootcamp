export class Map {
  constructor(cords) {
    //this.cords = cords;
    this.render(cords);
  }

  render(coordinates) {
    if (!google) {
      alert("Could not load goole map library , Please try again later");
      return;
    }

    const maps = new google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    });

    new google.maps.Marker({
      position: coordinates,
      map: maps,
    });
  }
}
