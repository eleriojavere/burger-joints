import { Venue } from "../interfaces/interfaces";

export const addMarkers = (map: google.maps.Map, results: Venue[]) => {
  results.map((venue) => {
    return new google.maps.Marker({
      position: {
        lat: venue.geocodes.main.latitude,
        lng: venue.geocodes.main.longitude,
      },
      map: map,
      clickable: true,
      title: venue.name,
    });
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
