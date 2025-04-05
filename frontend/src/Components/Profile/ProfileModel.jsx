import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import { useFormik } from 'formik';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export default function ProfileModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log("handle submit");
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      image: "",
    },
    onsubmit: handleSubmit,
  });

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onsubmit={formik.handleSubmit}>
            <div className="flex item-center justify-between">
                <div className="flex items-center space-x-3">
                   <IconButton onClick={handleClose} aria-label="delete">
                        <CloseIcon/>
                        <p>Edit Profile</p>
                   </IconButton>
                </div>

            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
