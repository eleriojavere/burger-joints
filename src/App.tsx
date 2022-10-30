import React from "react";
import Map from "./js/components/Map";
import "./scss/entry.scss";

function App() {
  return (
    <div className="max-width-wrapper">
      <h1>Venues</h1>
      <Map />
    </div>
  );
}

export default App;
