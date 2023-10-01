import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Toast = ({ open, message, severity, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Toast;
