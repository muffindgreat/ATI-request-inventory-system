import { useEffect } from "react";
import { toast, Bounce } from "react-toastify";

const useToast = () => {
  // Define showToast outside the useEffect
  const showToast = (message, type, options = {}) => {
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      ...options,
    };

    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      case "warn":
        toast.warn(message, toastOptions);
        break;
      // Add more cases for other types if needed
      default:
        // Default to success toast if no type is specified
        toast.success(message, toastOptions);
    }
  };

  useEffect(() => {
    // No need to return showToast here
  }, []);

  // Return the showToast function
  return showToast;
};

export default useToast;
