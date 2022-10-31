import React from "react";
import Gallery from "./js/components/Gallery";
import Map from "./js/components/Map";
import { useVenues } from "./js/contex/VenuesContext";
import "./scss/entry.scss";

function App() {
  const { hasError, isLoading } = useVenues();

  if (hasError) return <div>Error fetching Foursquare API</div>;

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return <div>Missing Google Maps API key</div>;
  }

  return (
    <div className="max-width-wrapper">
      <h1>Venues</h1>
      {isLoading ? (
        <div className="loader">Gathering data...</div>
      ) : (
        <>
          <Map googleMapsApiKey={googleMapsApiKey} />
          <Gallery />
        </>
      )}
    </div>
  );
}

export default App;
