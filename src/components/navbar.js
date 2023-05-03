import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <AppBar position="fixed">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <FitnessCenterIcon  sx={{ display: 'flex', mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1
                            }}
                        >REGIMATE</Typography>
                        <Box sx={{ display: 'flex' }}>
                            {user && (
                                <Button
                                    key="logout"
                                    onClick={handleClick}
                                    sx={{ color: 'white', my: 2, display: 'block' }}
                                >Log out</Button>
                            )}
                            {!user && (
                                <>
                                    <Button
                                        key="login"
                                        href="/login"
                                        sx={{ color: 'white', my: 2, display: 'block' }}
                                    >Login</Button>
                                    <Button
                                        key="signup"
                                        href="/signup"
                                        sx={{ my: 2, display: 'block' }}
                                    >Sign up</Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </header>
    );
};

export default Navbar;