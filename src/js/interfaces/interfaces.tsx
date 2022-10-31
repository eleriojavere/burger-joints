interface ContextResponse {
  geo_bounds: {
    circle: {
      center: {
        latitude: number;
        longitude: number;
      };
      radius: number;
    };
  };
}

interface Category {
  id: number;
  name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
}

interface GeoCode {
  main: {
    latitude: number;
    longitude: number;
  };
}
interface RelatedPlaces {
  parent: {
    fsq_id: string;
    name: string;
  };
}

interface Location {
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region: string;
}

export interface Venue {
  fsq_id: string;
  categories: Category[];
  chains: string[];
  distance: number;
  geocodes: GeoCode;
  link: string;
  location: Location | {};
  name: string;
  related_places: RelatedPlaces | {};
  timezone: string;
}

export interface VenueApiResponse {
  results: Venue[] | [];
  context: ContextResponse;
}

export interface VenuesContextInterface {
  venues: VenueApiResponse["results"];
  isLoading: boolean;
  hasError: boolean;
  venuePhotos: Photo[];
}

export interface VenuePhoto {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  classifications?: string[];
}

export interface Photo {
  fsq_id: string;
  url: string;
}
