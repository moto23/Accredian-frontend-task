import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Root = styled('div')({
    flexGrow: 1,
});

const Title = styled(Typography)({
    flexGrow: 1,
    cursor: 'pointer',
});

const LinkItem = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(2),
    cursor: 'pointer',
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block',
    },
}));

const StickyAppBar = styled(AppBar)({
    position: 'fixed',
    top: 0,
    zIndex: 1000,
});

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const drawer = (
        <List>
            <ListItem button onClick={scrollToTop}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => scrollToSection('about')}>
                <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={() => scrollToSection('contact')}>
                <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button component={RouterLink} to="/login">
                <ListItemText primary="Login/Register" />
            </ListItem>
        </List>
    );

    return (
        <Root>
            <StickyAppBar>
                <Toolbar>
                    {isMobile && (
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Title variant="h6" onClick={scrollToTop}>
                        Accredian
                    </Title>
                    {!isMobile && (
                        <>
                            <LinkItem variant="button" onClick={() => scrollToSection('home')}>
                                Home
                            </LinkItem>
                            <LinkItem variant="button" onClick={() => scrollToSection('about')}>
                                About
                            </LinkItem>
                            <LinkItem variant="button" onClick={() => scrollToSection('contact')}>
                                Contact
                            </LinkItem>
                            <Button component={RouterLink} to="/login" color="inherit">
                                Login/Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </StickyAppBar>
            <Toolbar /> {/* Ensures content starts below the fixed navbar */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawer}
            </Drawer>
        </Root>
    );
};

export default Navbar;
