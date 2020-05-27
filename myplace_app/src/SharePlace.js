import { Modal } from "./UI/Modal";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUsrBtn = document.getElementById("locate-btn");

    addressForm.addEventListener("submit", this.findaddresshandler);
    locateUsrBtn.addEventListener("click", this.locateuserHandler);
  }

  findaddresshandler() {}

  locateuserHandler() {
    if (!navigator.geolocation) {
      alert("Location feature is not available in your browser");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location--Please wait"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (sucesssResult) => {
        modal.hide();
        const coordinates = {
          latitude: sucesssResult.coords.latitude,
          longitude: sucesssResult.coords.longitude,
        };
        console.log(coordinates);
      },
      (error) => {
        modal.hide();
        alert("could not locate you , please enter the address manually");
      }
    );
  }
}

const placeFinder = new PlaceFinder();
