import { useState } from "react";
import beautyshop from "../image/beauty-shop.jpg";
import women from "../image/women.jpg";
import ModalCancel from "./ModalCancel";

function Banner({ key, name, detail, id }) {
  const [isDelete, setIsDelete] = useState(false);

  return (
    <div className="flex justify-around items-center border bg-orange-200 p-10 rounded-xl h-[200px] w-[1400px]">
      <img
        src={beautyshop}
        alt="pic"
        className="flex rounded-t-full w-[220px] h-[160px]"
      />
      <div className="flex flex-col gap-10 justify-center items-center">
        <div className="font-bold text-6xl">{name}</div>
        <div className="font-light text-4xl">{detail}</div>
      </div>
      <img
        src={women}
        alt="pic"
        className="flex rounded-full w-[180px] h-[180px]"
      />
      <div className="flex flex-col justify-end items-center">
        <button onClick={() => setIsDelete(true)}>delete</button>
        <ModalCancel
          key={id}
          id={id}
          open={isDelete}
          onClose={() => setIsDelete(false)}
        />
      </div>
    </div>
  );
}

export default Banner;
