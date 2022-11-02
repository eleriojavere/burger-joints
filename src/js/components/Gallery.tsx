import { useVenues } from "../context/VenuesContext";

export default function Gallery() {
  const { venuePhotos } = useVenues();

  return (
    <div className="gallery-container">
      {venuePhotos.map((venuePhoto) => (
        <div key={venuePhoto.fsq_id} className="image-wrapper">
          <img alt="venue" src={venuePhoto.url} />
        </div>
      ))}
    </div>
  );
}
