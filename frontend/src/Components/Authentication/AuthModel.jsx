import * as React from 'react';
import Box from '@mui/material/Box';
import SigninForm from './SigninFrom';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:2,
  outline:"none"
};

export default function AuthModal({open,handleClose}) {
  

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div>
            <SigninForm/>
        </div>
        </Box>
      </Modal>
    </div>
  );
}
