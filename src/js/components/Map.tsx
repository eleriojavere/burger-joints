import { useEffect } from "react";

import { callMapScript } from "../helpers/initMap";

export default function Map() {
  useEffect(() => {
    // fetchRestaurants()
    // filter() results 1km away from bussijaam
    callMapScript();
  }, []);
  return <div id="map"></div>;
}
