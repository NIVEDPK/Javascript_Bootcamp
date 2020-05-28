import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCords } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUsrBtn = document.getElementById("locate-btn");
    this.sharebtn = document.getElementById("share-btn");
    this.sharebtn.addEventListener("click", this.shareEventHandler);
    addressForm.addEventListener("submit", this.findaddresshandler);
    locateUsrBtn.addEventListener("click", this.locateuserHandler);
  }

  shareEventHandler = () => {
    const shareLink = document.getElementById("share-link");
    if (!navigator.clipboard) {
      shareLink.select();
      return;
    }

    navigator.clipboard
      .writeText(shareLink.value)
      .then(() => {
        alert("copied into clipboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  findaddresshandler = async (event) => {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    console.log(address);

    if (!address || address.trim().length === 0) {
      alert("Invalid Address entered , Please try again");
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "Loading location--Please wait"
    );

    modal.show();

    try {
      const coordinates = await getCoordsFromAddress(address);
      console.log(coordinates);
      this.selectplace(coordinates, address);
    } catch (error) {
      alert(error.message);
    }

    modal.hide();
  };

  selectplace = (coordinates, address) => {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    this.sharebtn.disabled = false;
    const shareLink = document.getElementById("share-link");
    shareLink.value = `${location.origin}/my-place?address=${encodeURI(
      address
    )}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  };

  locateuserHandler = () => {
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
      async (sucesssResult) => {
        const coordinates = {
          lat: sucesssResult.coords.latitude,
          lng: sucesssResult.coords.longitude,
        };
        const address = await getAddressFromCords(coordinates);
        modal.hide();
        this.selectplace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert("could not locate you , please enter the address manually");
      }
    );
  };
}

const placeFinder = new PlaceFinder();
