import React from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

interface Props {
  setStudentLocation: (value: string) => void;
}

export default function StudentLocationInput({ setStudentLocation }: Props) {
  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  // This callback is triggered when a user selects an address
  function onPlaceSelect(location: any) {
    if (location) {
      setStudentLocation(location.properties.formatted);
    } else {
      setStudentLocation("");
    }
  }

  return (
    <div>
      <label className="font-medium text-sm block mb-1">Student Location</label>

      <GeoapifyContext apiKey={apiKey}>
        <GeoapifyGeocoderAutocomplete
          placeholder="Enter city, address, or ZIP..."
          lang="en"
          limit={7}
          countryCodes={["us"]}
          type="city"
          // skipDetails={true} // <-- REMOVE THIS LINE
          // The component has a dedicated prop for the 'select' event
          placeSelect={onPlaceSelect}
        />
      </GeoapifyContext>
    </div>
  );
}