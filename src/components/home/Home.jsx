import React, { useState } from 'react';
import Navbar from './Navbar';
import ReferEarn from './ReferEarn';
import { Container, Box, Typography, Button, TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Box)(({ theme }) => ({
    padding: '50px 0',
}));

const AboutImage = styled('img')(({ theme }) => ({
    width: '100%',
    borderRadius: theme.shape.borderRadius,
}));

const CenteredBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
}));

const Footer = styled(Box)(({ theme }) => ({
    padding: '20px 0',
    textAlign: 'center',
    backgroundColor: theme.palette.grey[200],
}));

const BlurredBackground = styled(Container)(({ theme }) => ({
    filter: 'blur(8px)',
    pointerEvents: 'none',
}));

// CSS for blur effect
const blurBackgroundStyles = `
    .blur-background {
        filter: blur(8px);
        pointer-events: none;
    }
`;

const Home = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div className={dialogOpen ? 'blur-background' : ''}>
            <Navbar />
            <ReferEarn onDialogOpen={handleDialogOpen} onDialogClose={handleDialogClose} />
            <Container id="about" component={Section}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <AboutImage src="https://cdn.pixabay.com/photo/2019/04/14/11/04/contact-us-4126530_1280.jpg" alt="About Us" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CenteredBox>
                            <Typography variant="h4" gutterBottom>
                                About Us!!
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Invite your friends and earn rewards for the livelihood! The more friends you refer, the more you earn and get a chance to meet us .
                            </Typography>
                            
                        </CenteredBox>
                    </Grid>
                </Grid>
            </Container>
            <Container id="contact" component={Section}>
                <CenteredBox>
                    <Typography variant="h4" gutterBottom>
                        Contact Us
                    </Typography>
                </CenteredBox>
                <form noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                variant="outlined"
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="message"
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CenteredBox>
                                <Button variant="contained" color="primary" size="large">
                                    Send
                                </Button>
                            </CenteredBox>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Footer id="footer" component={Section}>
                <Typography variant="h6">
                    Created by @prasadnathe❤️
                </Typography>
            </Footer>
            {dialogOpen && <BlurredBackground />}
            <style>{blurBackgroundStyles}</style>
        </div>
    );
};

export default Home;
