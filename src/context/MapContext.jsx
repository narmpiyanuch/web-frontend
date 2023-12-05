import { useState } from "react";
import { createContext } from "react";
import axios from "../config/axios";

export const MapContext = createContext();

export default function MapContextProvider({ children }) {
  const [allShop, setAllShop] = useState();
  const [onChangeAddLocation, setOnChangeAddLocation] = useState({
    name: "",
    detail: "",
    price: "",
    sale: "",
    latitude: "",
    longitude: "",
  });

  console.log("line18", onChangeAddLocation);
  const handleOnChangeAddLocation = (e) => {
    setOnChangeAddLocation({
      ...onChangeAddLocation,
      [e.target.name]: e.target.value,
    });
  };

  const fetchAllShop = async () => {
    try {
      const allshop = await axios.get("/home/shops");
      setAllShop(allshop.data.shops);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MapContext.Provider
      value={{
        allShop,
        fetchAllShop,
        handleOnChangeAddLocation,
        setOnChangeAddLocation,
        onChangeAddLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
