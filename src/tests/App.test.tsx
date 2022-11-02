import { render, screen } from "@testing-library/react";
import App from "../js/App";
import { VenuesContext } from "../js/contex/VenuesContext";

describe("components/App", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...env,
      REACT_APP_FOURSQUARE_API_KEY: "foursquare-api-key",
      REACT_APP_GOOGLE_MAPS_API_KEY: "google-maps-api-key",
    };
  });

  afterEach(() => {
    process.env = env;
  });

  test("Render page when no missing API keys", () => {
    render(<App />);

    const element = screen.getByText(/Venues/i);
    expect(element).toBeInTheDocument();
  });

  test("Render error message when no foursquare API key", () => {
    process.env = {
      ...env,
      REACT_APP_FOURSQUARE_API_KEY: undefined,
    };

    render(<App />);

    const element = screen.getByText(/Missing Foursquare API key/i);
    expect(element).toBeInTheDocument();
  });

  test("Render error message when no Google Maps API key", () => {
    process.env = {
      ...env,
      REACT_APP_GOOGLE_MAPS_API_KEY: undefined,
      REACT_APP_FOURSQUARE_API_KEY: "foursquare-api-key",
    };

    render(<App />);

    const element = screen.getByText(/Missing Google Maps API key/i);
    expect(element).toBeInTheDocument();
  });

  test("Render loader when context isLoading state is true", () => {
    render(
      <VenuesContext.Provider
        value={{
          venues: [],
          isLoading: true,
          hasError: false,
          venuePhotos: [],
        }}
      >
        <App />
      </VenuesContext.Provider>
    );

    const element = screen.getByText(/Gathering data.../i);
    expect(element).toBeInTheDocument();
  });
});
