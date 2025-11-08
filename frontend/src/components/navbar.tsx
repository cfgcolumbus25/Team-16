import {
    AppBar,
    Toolbar,
    Typography,
    useTheme,
    useMediaQuery,
    Tabs,
    Tab,
    Box,
    Button,
    Menu,
    MenuItem,
    IconButton,
  } from '@mui/material';
  import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
  import DrawerComp from './drawer';
  import { useState } from 'react';
  import DarkModeIcon from '@mui/icons-material/DarkMode';
  import LightModeIcon from '@mui/icons-material/LightMode';
  import { useThemeMode } from '../contexts/ThemeContext';
  
  interface NavBarProps {
    links: string[];
  }
  
  export default function NavBar({ links }: NavBarProps) {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { mode, toggleTheme } = useThemeMode();

  
    const getPath = (link: string): string => {
        if (link.toLowerCase() === 'clep search') {
        return '/';
        }
        return `/${link.toLowerCase()}`;
    };


    const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleUserTypeSelect = (userType: 'Learners' | 'University' | 'Admin') => {
      handleMenuClose();
      if (userType === 'University') {
        // University goes directly to dashboard (institution selection first)
        navigate('/university-dashboard');
      } else {
        // Learners and Admin go to login page
        navigate(`/login?type=${userType}`);
      }
    };
  
    return (
      <AppBar
        position="sticky"
        sx={{
          backgroundImage: mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 58, 95, 0.95) 0%, rgba(15, 31, 53, 0.95) 100%)'
            : 'radial-gradient(circle,rgba(255, 203, 5, 1) 0%, rgba(255, 255, 255, 1) 100%)',
          transition: 'background-image 0.3s ease',
        }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <Button
                sx={{
                  background: 'transparent',
                  '&:hover': { background: 'transparent' },
                  color: 'white',
                }}
                component={RouterLink}
                to="/"
              >
                <Box
                  component="img"
                  src="/ms-logo.svg"
                  alt="Modern States Logo"
                  sx={{ height: '35px', width: 'auto', paddingRight: '5px' }}
                />
                <Typography component="div"></Typography>
              </Button>
  
              {/* DrawerComp should also receive typed props */}
              <DrawerComp links={links} />
              
              {/* LOGIN BUTTON FOR MOBILE */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: mode === 'dark' ? '#a8d0f0' : 'black',
                    '&:hover': {
                      backgroundColor: mode === 'dark' ? 'rgba(168, 208, 240, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="toggle dark mode"
                >
                  {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <Button
                  variant="contained"
                  onClick={handleLoginClick}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    },
                  }}
                >
                  Login
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => handleUserTypeSelect('Learners')}>
                    Learners
                  </MenuItem>
                  <MenuItem onClick={() => handleUserTypeSelect('University')}>
                    University
                  </MenuItem>
                  <MenuItem onClick={() => handleUserTypeSelect('Admin')}>
                    Admin
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              {/* LEFT LOGO */}
              <Button
                sx={{
                  background: 'transparent',
                  '&:hover': { background: 'transparent' },
                  color: 'white',
                  minWidth: '200px',
                  justifyContent: 'flex-start',
                }}
                component={RouterLink}
                to="/"
              >
                <Box
                  component="img"
                  src="/ms-logo.svg"
                  alt="Modern States Logo"
                  sx={{ height: '35px', width: 'auto', paddingRight: '5px' }}
                />
                <Typography component="div" sx={{ fontWeight: 700 }}>
                 
                </Typography>
              </Button>
  
              {/* CENTER TABS */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Tabs indicatorColor="secondary" textColor="inherit" value={location.pathname}>
                  {links.map((link, index) => {
                    const path = getPath(link);
                    return (
                      <Tab
                        key={index}
                        label={link}
                        component={RouterLink}
                        to={path}
                        value={path}
                        sx={{ 
                          color: mode === 'dark' ? '#e8f0f8' : 'black',
                          transition: 'color 0.3s ease',
                        }}
                      />
                    );
                  })}
                </Tabs>
              </Box>
  
              {/* RIGHT LOGIN BUTTON */}
              <Box sx={{ minWidth: '200px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: mode === 'dark' ? '#a8d0f0' : 'black',
                    '&:hover': {
                      backgroundColor: mode === 'dark' ? 'rgba(168, 208, 240, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="toggle dark mode"
                >
                  {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <Button
                  variant="contained"
                  onClick={handleLoginClick}
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    },
                  }}
                >
                  Login
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => handleUserTypeSelect('Learners')}>
                    Learners
                  </MenuItem>
                  <MenuItem onClick={() => handleUserTypeSelect('University')}>
                    University
                  </MenuItem>
                  <MenuItem onClick={() => handleUserTypeSelect('Admin')}>
                    Admin
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
  