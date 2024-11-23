
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import AddIcon from "@mui/icons-material/AddCircle"
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline"
import { Avatar } from '@mui/material';

const ChildrenCard = ({ id, name, balance, avatar,setOpenDialog,setMovmentType }) => {

    const theme = useTheme();
    if (!balance) return <></> 

    return (
        <Card sx={{ display: 'flex' }}>
            <Avatar
                src={avatar}
                sx={{
                    width: 80,
                    height: 80,
                    mb: 1,
                    border: '3px solid',
                    borderColor: 'primary.contrastText'
                }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {balance?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }) }
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="withdraw" onClick={()=>{setOpenDialog(true); setMovmentType(1)}}>
                        <RemoveIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="deposit" onClick={()=>{setOpenDialog(true); setMovmentType(2)}}>
                        <AddIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                </Box>
            </Box>

        </Card>
    );
}

export default ChildrenCard