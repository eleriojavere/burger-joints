import { Venue } from "../interfaces/interfaces";

export const addMarkers = (map: google.maps.Map, venues: Venue[]) => {
  venues.map((venue) => {
    const marker = new google.maps.Marker({
      position: {
        lat: venue.geocodes.main.latitude,
        lng: venue.geocodes.main.longitude,
      },
      map: map,
      clickable: true,
      title: venue.name,
    });

    google.maps.event.addListener(marker, "click", () => {
      createInfoWindowForMarker(
        marker,
        map,
        venue.geocodes.main.latitude,
        venue.geocodes.main.longitude
      );
    });

    return marker;
  });
};

export const drawCirleAroundBusStation = (map: google.maps.Map) => {
  return new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeWeight: 2,
    fillColor: "transparent",
    fillOpacity: 0.35,
    map: map,
    center: {
      lat: 58.378,
      lng: 26.7321,
    },
    radius: 1000,
  });
};

const createInfoWindowForMarker = (
  marker: google.maps.Marker,
  map: google.maps.Map,
  lat: number,
  long: number
) => {
  const infoWindow = new google.maps.InfoWindow({
    maxWidth: 350,
    content: marker.getTitle(),
    pixelOffset: new google.maps.Size(-10, -25),
  });

  infoWindow.open(map);
  infoWindow.setPosition(new google.maps.LatLng(lat, long));
};
