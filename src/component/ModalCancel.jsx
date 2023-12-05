import axios from "../config/axios";

function ModalCancel({ open, onClose, id }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/home/cancel/${id}`);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 bg-white opacity-80 z-20"></div>
          <div className="fixed inset-0 z-30 ">
            <div className="flex justify-center items-center min-h-full">
              <div className="rounded-md w-64 h-36 shadow-xl bg-white border border-black">
                <div className="flex flex-col items-end w-full p-2">
                  <span
                    className="hover:cursor-pointer hover:text-red-600 text-lg font-medium"
                    onClick={onClose}
                  >
                    X
                  </span>
                </div>
                <form
                  className="flex flex-col justify-center items-center gap-2"
                  onSubmit={handleDelete}
                >
                  <div className="text-lg">Do you want to delete this. ?</div>
                  <div>
                    <button className="flex border border-orange-950 bg-orange-300 rounded-md p-1">
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

export default ModalCancel;
