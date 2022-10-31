import { useVenues } from "../contex/VenuesContext";
import GoogleMapReact from "google-map-react";
import { addMarkers } from "../helpers/initMap";

export default function Map({
  googleMapsApiKey,
}: {
  googleMapsApiKey: string;
}) {
  const { venues } = useVenues();

  const defaultProps = {
    center: { lat: 58.378, lng: 26.7321 },
    zoom: 14,
  };

  return (
    <div id="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapsApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map }) => {
          addMarkers(map, venues);
        }}
        yesIWantToUseGoogleMapApiInternals
      />
    </div>
  );
}
