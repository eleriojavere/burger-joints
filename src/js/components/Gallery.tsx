import { useVenues } from "../contex/VenuesContext";

export default function Gallery() {
  const { venuePhotos } = useVenues();

  return (
    <div className="gallery-container">
      {venuePhotos.map((venuePhoto) => (
        <div className="image-wrapper">
          <img alt="venue" key={venuePhoto.fsq_id} src={venuePhoto.url} />
        </div>
      ))}
    </div>
  );
}
