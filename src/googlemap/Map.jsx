import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { GOOGLE_KEY } from "../config/env";
import { useEffect, useContext } from "react";
import { MapContext } from "../context/MapContext";

const center = {
  lat: 13.661867348897822,
  lng: 100.60270127895559,
};

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_KEY,
  });

  const { setOnChangeAddLocation, onChangeAddLocation, allShop } =
    useContext(MapContext);

  if (!isLoaded) {
    return <div>Loading....</div>;
  }
  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName={"google-map"}
      options={{
        disableDoubleClickZoom: true,
        zoomControl: false,
        scrollwheel: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        clickableIcons: false,
      }}
      onClick={(e) => {
        setOnChangeAddLocation({
          ...onChangeAddLocation,
          latitude: e.latLng.lat(),
          longitude: e.latLng.lng(),
        });
        console.log("line42", onChangeAddLocation);
      }}
    >
      {allShop?.map((shop) => (
        <Marker
          key={shop.id}
          position={{ lat: +shop.latitude, lng: +shop.longitude }}
          label={shop.name}
          title={shop.name}
        />
      ))}
    </GoogleMap>
  );
}
