import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

export default function Tostyfy({satingTostyfy}) {
  const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(true);
//   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{vertical:'top', horizontal: 'center'}}
      >
        <Alert severity={satingTostyfy.severity}>{satingTostyfy.message}</Alert>
      </Snackbar>
    
  );
}

