import { useVenues } from "../contex/VenuesContext";

export default function Gallery() {
  const { venuePhotos } = useVenues();

  return (
    <>
      {venuePhotos.map((venuePhoto) => (
        <img
          style={{ width: 80, height: 80 }}
          alt="venue"
          key={venuePhoto.fsq_id}
          src={venuePhoto.url}
        />
      ))}
    </>
  );
}
