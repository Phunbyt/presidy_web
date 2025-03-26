import { Box } from "@mui/material";
import { useContext } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { GlobalContext } from "../../context/GlobalContext";

export function ToastPopup() {
  //   const notify = () => toast(message);
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Box>
      {/* <button onClick={notify}>Notify!</button> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkTheme ? "dark" : "light"}
        transition={Bounce}
      />
    </Box>
  );
}
