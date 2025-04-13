import * as React from "react";
import Box from "@mui/material/Box";
import SigninForm from "./SigninFrom";
import SignupForm from "./SignupForm";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center font-bold text-2xl">
            Create Your Account
          </h1>
          {location.pathname === "/signup" ? <SignupForm /> : <SigninForm />}

          <h1 className="text-center py-5 font-semibold text-lg text-gray-500">
            {location.pathname === "/signup"
              ? "Already have an account?"
              : "If you don't have an account"}
          </h1>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleNavigate}
            sx={{ borderRadius: "29px", py: "15px" }}
          >
            {location.pathname === "/signup" ? "Signin" : "Signup"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
