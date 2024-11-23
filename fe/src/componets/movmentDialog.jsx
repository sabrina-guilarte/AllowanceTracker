import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function MovementDialog({open,setOpen,type}) {

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                handleClose();
            },
        }}
    >
        <DialogTitle>{type == "1" ? "Withdraw" : "Deposit"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {type==1 ? "How much would you like to withdraw from this account?" : "How much would you like to deposit from this account?"}
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="reason"
                name="reason"
                label="Reason"
                type="text"
                fullWidth
                variant="standard"
            />

            <TextField
                autoFocus
                required
                margin="dense"
                id="amount"
                name="email"
                label="amount"
                type="number"
                fullWidth
                variant="standard"
            />

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Generar</Button>
        </DialogActions>
    </Dialog>

}