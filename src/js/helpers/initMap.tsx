export const callMapScript = () => {
  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDuWVLOaWQdwBNoDyyqqZ7GxXrJ2cM9Lj8&callback=initMap";
  script.async = true;
  document.body.appendChild(script);
};

// Callback funtion to initialize and add the map
export function initMap() {
  const centerLocation = { lat: 58.378, lng: 26.729 };

  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 14,
      center: centerLocation,
    }
  );

  new google.maps.Marker({
    position: centerLocation,
    map: map,
  });
}
