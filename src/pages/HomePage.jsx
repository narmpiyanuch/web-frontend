import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ModalEditProfile from "../component/ModalEditProfile";
import Map from "../googlemap/Map";
import ModalLocation from "../component/ModalLocation";
import { MapContext } from "../context/MapContext";
import Banner from "../component/Banner";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  const { fetchProfile, member, logout } = useContext(AuthContext);
  const { fetchAllShop, allShop } = useContext(MapContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchAllShop();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-md:flex flex-col">
      <div className="flex justify-end bg-orange-100">
        <div className="flex p-4 text-xl">Hello {member?.memberName}</div>
        <button className="p-4 text-sm" onClick={() => setIsOpen(true)}>
          Edit profile
        </button>
        <ModalEditProfile open={isOpen} onClose={() => setIsOpen(false)} />
        <button className="p-4 text-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="flex justify-center items-center p-2 font-semibold text-green-900 text-6xl">
        Web Banner
      </div>
      <div className="flex justify-end font-normal text-sm p-2">
        <button
          className="bg-lime-950 text-white p-1 rounded-md"
          onClick={() => setOpenLocation(true)}
        >
          Add Shop
        </button>
        <ModalLocation
          open={openLocation}
          onClose={() => setOpenLocation(false)}
        />
      </div>
      <div className="flex flex-col py-4 px-20 gap-4 items-center">
        {allShop?.map((item) => (
          <Banner
            key={item.id}
            id={item.id}
            name={item.name}
            detail={item.detail}
            price={item.price}
            sale={item.sale}
            latitude={item.latitude}
            longitude={item.longitude}
          />
        ))}
      </div>
      <div className="flex justify-start pl-6">
        <div className="h-[300px] w-[400px]">
          <div className="h-[100%] overflow-hidden rounded-xl border">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
