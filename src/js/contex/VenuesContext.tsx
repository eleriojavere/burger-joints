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
      fetchData(apiBaseUrl, apiKey);
    } else {
      setHasError(true);
    }
  }, []);

  const value = {
    venues,
    isLoading,
    hasError,
    venuePhotos,
  };

  async function fetchData(apiBaseUrl: string, apiKey: string) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: apiKey,
      },
    };

    await fetch(`${apiBaseUrl}/search?query=burger&near=Tartu`, options)
      .then((response) => response.json())
      .then((response: VenueApiResponse) => {
        const venuesNotWithin1kmFromBusStation = filterVenues(response.results);
        setVenues(venuesNotWithin1kmFromBusStation);

        // fetch venue images corresponding to venue fsq_id

        Promise.all(
          venuesNotWithin1kmFromBusStation.map(async (venue) => {
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

function filterVenues(venues: Venue[]) {
  const pointerLongitude = 58.378;
  const pointerLatitude = 26.7321;
  const radiusToExclude = 1000;
  return venues.filter((venue) => {
    return (
      getPointerDistanceFromVenue(
        venue.geocodes.main.latitude,
        venue.geocodes.main.longitude,
        pointerLongitude,
        pointerLatitude
      ) > radiusToExclude
    );
  });
}

function getPointerDistanceFromVenue(
  venueLatitude: number,
  venueLongitude: number,
  pointerLatitude: number,
  pointerLongitude: number
) {
  const distance =
    2 *
    6371000 *
    Math.asin(
      Math.sqrt(
        Math.pow(
          Math.sin(
            (pointerLatitude * (3.14159 / 180) -
              venueLatitude * (3.14159 / 180)) /
              2
          ),
          2
        ) +
          Math.cos(pointerLatitude * (3.14159 / 180)) *
            Math.cos(venueLatitude * (3.14159 / 180)) *
            Math.sin(
              Math.pow(
                (pointerLongitude * (3.14159 / 180) -
                  venueLongitude * (3.14159 / 180)) /
                  2,
                2
              )
            )
      )
    );
  return distance;
}
