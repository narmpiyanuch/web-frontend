import Swal from "sweetalert2";

export const createAlert = (title, text) => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: text,
  });
};

export const alertBox = (title) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};
