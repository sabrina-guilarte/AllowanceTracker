import React, { useState,useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Grid,
  Paper,
  Typography,
  Button,
  Fade
} from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CloseIcon from '@mui/icons-material/Close';

const PinModal = ({ open, onClose, onSubmit }) => {
  const [pin, setPin] = useState('');
  const maxLength = 4; // PIN length

  const handleNumberClick = (number) => {
    if (pin.length < maxLength) {
      setPin(prev => prev + number);
    } 
  };

  useEffect(()=>{
    if(pin.length == maxLength){
        setTimeout(()=>{
            console.log(open)
              handleSubmit()
        },300)
      
    }
  },[pin])

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPin('');
  };

  const handleSubmit = () => {
    if (pin.length === maxLength) {
      if(open.pin == pin) {
              const user = open
              onClose()
              onSubmit(open);
      } else {
        alert("WRONG PIN")
      }
      handleClear();
    }
  };

  const renderPinDots = () => {
    return Array(maxLength).fill(0).map((_, index) => (
      <Box
        key={index}
        sx={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: '2px solid',
          borderColor: index < pin.length ? 'primary.main' : 'grey.300',
          bgcolor: index < pin.length ? 'primary.main' : 'transparent',
          mx: 1
        }}
      />
    ));
  };

  const NumberButton = ({ number }) => (
    <Paper
      elevation={2}
      sx={{
        width: 70,
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'scale(1.1)',
          bgcolor: 'action.hover'
        },
        '&:active': {
          transform: 'scale(0.95)'
        }
      }}
      onClick={() => handleNumberClick(number)}
    >
      <Typography variant="h4">{number}</Typography>
    </Paper>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Enter PIN</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pb: 3
          }}
        >
          {/* PIN dots display */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
              mt: 2
            }}
          >
            {renderPinDots()}
          </Box>

          {/* Number pad */}
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <Grid item key={number}>
                <NumberButton number={number} />
              </Grid>
            ))}
            <Grid item>
              <Paper
                elevation={2}
                sx={{
                  width: 70,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
                onClick={handleClear}
              >
                <Typography variant="body1">Clear</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <NumberButton number={0} />
            </Grid>
            <Grid item>
              <Paper
                elevation={2}
                sx={{
                  width: 70,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
                onClick={handleBackspace}
              >
                <BackspaceIcon />
              </Paper>
            </Grid>
          </Grid>

        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PinModal;