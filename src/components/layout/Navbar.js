import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AppBar, Box, Button, Stack } from '@mui/material';
import { items } from '../../options/navOptions';
import { Logo } from '../Logo';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const location = useLocation();

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <AppBar position="fixed" elevation={0}>
                <Box sx={{ display: 'flex', mx: 2 }}>
                    <Box sx={{ p: 1, display: 'flex', flexGrow: 1 }}>
                        <Logo/>
                    </Box>
                    <Stack direction='row' gap={0.5} >
                        {items
                            .filter(item => user ? item.authRequired !== null : !item.authRequired)
                            .map(item => (
                                <Button
                                    key={item.title}
                                    href={item.path}
                                    sx={{ color: 'white', my: 0 }}
                                >
                                    {item.title}
                                    {location.pathname === item.path && (
                                        <div
                                            className="triangle" // Class for the triangle
                                            style={{
                                                width: 0,
                                                height: 0,
                                                borderBottom: '6px solid white',
                                                borderLeft: '6px solid transparent',
                                                borderRight: '6px solid transparent',
                                                position: 'absolute',
                                                bottom: 0,
                                                left: '50%',
                                                transform: 'translateX(-50%)', // Center horizontally
                                            }}
                                        />
                                    )}
                                    
                                </Button>
                            ))
                        }
                        {user && (
                            <Button
                                key="logout"
                                onClick={handleClick}
                                sx={{ color: 'white', my: 0 }}
                            >
                                Log out
                            </Button>
                        )}
                    </Stack>
                </Box>
            </AppBar>
        </header>
    );
};

export default Navbar;