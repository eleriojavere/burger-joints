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
