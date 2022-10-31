import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  VenueApiResponse,
  Venue,
  VenuesContextInterface,
  VenuePhotoApiResponse,
  Photo,
} from "../interfaces/interfaces";

export const VenuesContext = React.createContext<VenuesContextInterface>({
  venues: [],
  isLoading: false,
  hasError: false,
  venuePhotos: [],
});

export function VenuesProvider({ children }: { children: ReactElement }) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [venuePhotos, setVenuePhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const apiBaseUrl = process.env.REACT_APP_FOURSQUARE_API_BASE_URL;
    const apiKey = process.env.REACT_APP_FOURSQUARE_API_KEY;

    if (apiBaseUrl && apiKey) {
      setIsLoading(true);

      const options = {
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      };

      fetchData(
        apiBaseUrl,
        setVenues,
        options,
        setVenuePhotos,
        setIsLoading,
        setHasError
      );
    }
  }, []);

  const value = {
    venues,
    isLoading,
    hasError,
    venuePhotos,
  };

  return (
    <VenuesContext.Provider value={value}>{children}</VenuesContext.Provider>
  );
}

export function useVenues() {
  return useContext(VenuesContext);
}

function generatePhotoUrl(
  prefix: string,
  width: number,
  height: number,
  sufix: string
) {
  return `${prefix}${width}x${height}${sufix}`;
}

async function fetchData(
  apiBaseUrl: string,
  setVenues: (response: Venue[]) => void,
  options: { headers: { accept: string; Authorization: string } },
  setVenuePhotos: (currentPhotos: any) => void,
  setIsLoading: (value: boolean) => void,
  setHasError: (value: boolean) => void
) {
  await fetch(`${apiBaseUrl}/search?query=burger&near=Tartu`, options)
    .then((response) => response.json())
    .then((response: VenueApiResponse) => {
      setVenues(response.results);

      // fetch image corresponding to venue fsq_id

      Promise.all(
        response.results.map((venue) => {
          return fetch(
            `https://api.foursquare.com/v3/places/${venue.fsq_id}/photos?limit=1&sort=NEWEST`,
            options
          )
            .then((response) => response.json())
            .then((response: VenuePhotoApiResponse[]) => {
              const newestPhoto = response[0];

              if (newestPhoto != null) {
                const photoUrl = generatePhotoUrl(
                  newestPhoto.prefix,
                  newestPhoto.width,
                  newestPhoto.height,
                  newestPhoto.suffix
                );

                setVenuePhotos((currentPhotos: Photo[]) => [
                  ...currentPhotos,
                  { fsq_id: venue.fsq_id, url: photoUrl },
                ]);
              }
            })

            .catch((error) => {
              console.error(error);
            });
        })
      ).then(() => {
        setIsLoading(false);
      });
    })

    .catch((err) => {
      console.error(err);
      setIsLoading(false);
      setHasError(true);
    });
}
