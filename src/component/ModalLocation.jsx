import { useEffect, useState } from "react";
import axios from "../config/axios";
import Input from "./Input";
import { createAlert } from "../utils/sweet-alert";
import { useContext } from "react";
import Map from "../googlemap/Map";
import { MapContext } from "../context/MapContext";

function ModalLocation({ open, onClose }) {
  const {
    fetchAllShop,
    handleOnChangeAddLocation,
    setOnChangeAddLocation,
    onChangeAddLocation,
  } = useContext(MapContext);

  const handleSubmitForm = async () => {
    try {
      await axios.post("/home/create-banner", onChangeAddLocation);
      createAlert("Created Shop!");
      fetchAllShop();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 bg-white z-20"></div>
          <div className="fixed inset-0 z-30 ">
            <div className="flex justify-center items-center min-h-full">
              <div className="rounded-md w-auto shadow-xl">
                <div className="flex flex-col items-end w-full pr-6">
                  <span
                    className="hover:cursor-pointer hover:text-red-600 text-lg font-medium"
                    onClick={onClose}
                  >
                    X
                  </span>
                </div>
                <form
                  className="flex flex-col justify-center items-center gap-2"
                  onSubmit={handleSubmitForm}
                >
                  <div className="grid grid-cols-2 h-[600px] w-[1000px] gap-4">
                    <div className="bg-red-300 h-[100%] overflow-hidden rounded-3xl drop-shadow-2xl">
                      <Map />
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center p-4 w-full">
                      <div className="text-xl font-semibold">Add new shop</div>
                      <Input
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={onChangeAddLocation?.name}
                        onChange={(e) => {
                          handleOnChangeAddLocation(e);
                        }}
                      />
                      <Input
                        placeholder="Detail"
                        type="text"
                        name="detail"
                        value={onChangeAddLocation?.detail}
                        onChange={(e) => {
                          handleOnChangeAddLocation(e);
                        }}
                      />
                      <Input
                        placeholder="Price"
                        type="text"
                        name="price"
                        value={onChangeAddLocation?.price}
                        onChange={(e) => {
                          handleOnChangeAddLocation(e);
                        }}
                      />
                      <Input
                        placeholder="Sale"
                        type="text"
                        name="sale"
                        value={onChangeAddLocation?.sale}
                        onChange={(e) => {
                          handleOnChangeAddLocation(e);
                        }}
                      />
                      <Input
                        placeholder="Latitude"
                        type="text"
                        name="latitude"
                        value={onChangeAddLocation?.latitude}
                        onChange={(e) => {
                          handleOnChangeAddLocation(e);
                        }}
                      />
                      <Input
                        placeholder="longitude"
                        type="text"
                        name="longitude"
                        value={onChangeAddLocation?.longitude}
                        onChange={(e) => {
                          handleOnChangeAddLocation(e);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <button className="flex border border-orange-950 bg-orange-300 rounded-md p-2">
                      confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ModalLocation;
