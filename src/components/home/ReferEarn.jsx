import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Container, Box, Grid, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Banner = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(https://img.freepik.com/free-vector/people-making-money-from-referral-concept-illustration_52683-22927.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1720656000&semt=ais_user)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '150px 0',
}));

const HeroSection = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: '20px',
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: '20px',
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
    marginBottom: '30px',
}));

const ReferButton = styled(Button)(({ theme }) => ({
    padding: '10px 20px',
    fontSize: '16px',
}));

const FormField = styled(TextField)(({ theme }) => ({
    marginBottom: '15px',
}));

const ReferEarn = ({ onDialogOpen, onDialogClose }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        referrerName: '',
        referrerEmail: '',
        refereeName: '',
        refereeEmail: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleClickOpen = () => {
        setOpen(true);
        onDialogOpen();
    };

    const handleClose = () => {
        setOpen(false);
        onDialogClose();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value,
            [`${name}Error`]: false,
        };

        // Email validation
        if (name === 'referrerEmail' || name === 'refereeEmail') {
            updatedFormData[`${name}Error`] = !value.includes('@');
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async () => {
        if (!formData.referrerName || !formData.referrerEmail || !formData.refereeName || !formData.refereeEmail) {
            setSnackbarMessage('Please enter all fields');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);

            const updatedFormData = { ...formData };
            if (!formData.referrerName) updatedFormData.referrerNameError = true;
            if (!formData.referrerEmail) updatedFormData.referrerEmailError = true;
            if (!formData.refereeName) updatedFormData.refereeNameError = true;
            if (!formData.refereeEmail) updatedFormData.refereeEmailError = true;
            setFormData(updatedFormData);

            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/referral', formData);
            console.log('Referral saved:', response.data);
            setSnackbarMessage('Referral sent successfully');
            setSnackbarSeverity('success');
            setFormData({
                referrerName: '',
                referrerEmail: '',
                refereeName: '',
                refereeEmail: '',
            });
            handleClose();
        } catch (error) {
            console.error('Error submitting referral:', error);
            setSnackbarMessage('Failed to send referral');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    return (
        <Container id="refer-earn">
            <Banner>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <HeroSection>
                            <HeroTitle variant="h3">Let’s Learn & Earn</HeroTitle>
                            <HeroSubtitle variant="h6">Get a chance to win up to Rs. 1,00,000</HeroSubtitle>
                            <ReferButton variant="contained" color="primary" onClick={handleClickOpen}>
                                Refer Now
                            </ReferButton>
                        </HeroSection>
                    </Grid>
                </Grid>
            </Banner>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ textAlign: 'center' }}>Refer a Friend</DialogTitle>
                <DialogContent style={{ padding: '20px' }}>
                    <Typography variant="body2" color="white">
                        * Represents compulsory fields
                    </Typography>
                    <FormField
                        margin="dense"
                        name="referrerName"
                        label="Your Name *"
                        fullWidth
                        variant="outlined"
                        value={formData.referrerName}
                        onChange={handleChange}
                        error={formData.referrerNameError}
                        helperText={formData.referrerNameError ? 'Please enter your name' : ''}
                    />
                    <FormField
                        margin="dense"
                        name="referrerEmail"
                        label="Your Email *"
                        fullWidth
                        variant="outlined"
                        value={formData.referrerEmail}
                        onChange={handleChange}
                        error={formData.referrerEmailError}
                        helperText={formData.referrerEmailError ? 'Please enter a valid email' : ''}
                    />
                    <FormField
                        margin="dense"
                        name="refereeName"
                        label="Friend's Name *"
                        fullWidth
                        variant="outlined"
                        value={formData.refereeName}
                        onChange={handleChange}
                        error={formData.refereeNameError}
                        helperText={formData.refereeNameError ? 'Please enter friend\'s name' : ''}
                    />
                    <FormField
                        margin="dense"
                        name="refereeEmail"
                        label="Friend's Email *"
                        fullWidth
                        variant="outlined"
                        value={formData.refereeEmail}
                        onChange={handleChange}
                        error={formData.refereeEmailError}
                        helperText={formData.refereeEmailError ? 'Please enter a valid email' : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ReferEarn;
