import React from "react";
import Gallery from "./components/Gallery";
import Map from "./components/Map";
import { useVenues } from "./contex/VenuesContext";

function App() {
  const { hasError, isLoading } = useVenues();

  if (hasError) return <div>Error fetching Foursquare API</div>;

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const foursquareApiKey = process.env.REACT_APP_FOURSQUARE_API_KEY;

  if (!foursquareApiKey) {
    return <div>Missing Foursquare API key</div>;
  }

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
