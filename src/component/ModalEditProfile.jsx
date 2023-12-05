import { useEffect, useState } from "react";
import axios from "../config/axios";
import Input from "./Input";
import { createAlert } from "../utils/sweet-alert";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ModalEditProfile({ open, onClose }) {
  const [input, setInput] = useState({
    memberName: "",
    mobile: "",
  });

  const { member, fetchProfile } = useContext(AuthContext);

  useEffect(() => {
    setInput({
      memberName: member?.memberName,
      mobile: member?.mobile,
    });
  }, [member]);

  const handleSubmitChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      await axios.patch("/home/update-profile", input);
      createAlert("Profile updated!");
      fetchProfile();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(input);

  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 bg-gray-500 opacity-50 z-20"></div>
          <div className="fixed inset-0 z-30 ">
            <div className="flex justify-center items-center min-h-full">
              <div className="rounded-md w-auto shadow-xl">
                <div className="flex flex-col items-center justify-center h-[300px] w-[280px] bg-white rounded-md gap-4">
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
                    <div className="flex flex-col gap-4 justify-start items-start p-4 w-full">
                      <Input
                        title="Name"
                        type="text"
                        name="memberName"
                        value={input?.memberName}
                        onChange={handleSubmitChange}
                      />
                      <Input
                        title="Mobile"
                        type="text"
                        name="mobile"
                        value={input?.mobile}
                        onChange={handleSubmitChange}
                      />
                    </div>
                    <div>
                      <button className="flex border border-orange-950 bg-orange-300 rounded-md p-2">
                        confirm edit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ModalEditProfile;
