import React from 'react';
import { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Avatar,
    Grid,
    Paper,
    Button,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PinModal from '../../componets/pinModa';

const UserSelector = ({ loginData, setLoginData, setPage }) => {
    // Sample users data - replace with your actual data

    const [isPinModalOpen, setIsPinModalOpen] = useState()
    const users = [
        { id: "dc7f14d2-ee0f-4065-9a47-b0d8793fc2c5", name: 'Andres', avatar: '/api/placeholder/150/1504', isKid: false, pin: 2209},
        { id: "1f5e0e17-9dc2-4e7b-aaab-6d31729df538", name: 'Sabrina', avatar: '/api/placeholder/150/150', isKid: false, pin: 2208 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add2", name: 'Chedar2', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add1", name: 'Chedar', avatar: '/api/placeholder/150/150', isKid: true, pin: 7070 , balance:100 },
        { id: "ee5bb61d-b3ee-4435-a8ff-f0760cc7add5", name: 'Picarita', avatar: '/api/placeholder/150/150', isKid: true, pin: 7171, balance:350  }
    ];

    const handleUserSelect = (userId) => {
        console.log('Selected user:', userId);
        setIsPinModalOpen(users.filter(user => user.id == userId)[0])
        // Add your user selection logic here
    };

    const handleAddProfile = () => {
        console.log('Add new profile clicked');
        // Add your new profile logic here
    };

    const handleEditProfiles = () => {
        console.log('Edit profiles clicked');
        // Add your edit profiles logic here
    };

    const onPinSubmited = (user) => {
        setLoginData({ ...loginData, ...user })
        setPage("mainLayout", {user,users})

    }

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
             
                   
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ mb: 6, fontWeight: 'bold' }}
                >
                    Welcome to {loginData.familyName} Family!
                </Typography>

                <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
                    {users.map((user) => (
                        <Grid item key={user.id}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                            '& .MuiAvatar-root': {
                                                border: '4px solid #fff',
                                            },
                                        },
                                    }}
                                    onClick={() => handleUserSelect(user.id)}
                                >
                                    <Avatar
                                        src={user.avatar}
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            border: '2px solid transparent',
                                            transition: 'all 0.2s',
                                        }}
                                    />
                                </Paper>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        mt: 2,
                                        color: 'text.primary',
                                        textAlign: 'center',
                                        fontWeight: user.isKid ? 400 : 500,
                                    }}
                                >
                                    {user.name}
                                </Typography>
                                {user.isKid && (
                                    <Typography
                                        variant="caption"
                                        sx={{ color: 'success.main', mt: 0.5 }}
                                    >
                                        Kids
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    ))}

                
                </Grid>

                <PinModal
                    open={isPinModalOpen}
                    onClose={() => setIsPinModalOpen(false)}
                    onSubmit={onPinSubmited}
                />

            </Box>
        </Container>
    );
};

export default UserSelector;
