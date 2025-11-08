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
  } from '@mui/material';
  import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
  import DrawerComp from './drawer';
  import { useState } from 'react';
  
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
  
    // Type the helper function
    const getPath = (link: string): string => `/${link.toLowerCase()}`;

    const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleUserTypeSelect = (userType: 'Learners' | 'University' | 'Admin') => {
      handleMenuClose();
      navigate(`/login?type=${userType}`);
    };
  
    return (
      <AppBar
        position="sticky"
        sx={{
          backgroundImage:
            'radial-gradient(circle,rgba(255, 203, 5, 1) 0%, rgba(255, 255, 255, 1) 100%)',
        }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <Button
                sx={{
                  background: 'transparent',
                  '&:hover': { background: 'rgba(2,0,36,0.8)' },
                  color: 'white',
                }}
                component={RouterLink}
                to="/vote"
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
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
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
                  '&:hover': { background: 'rgba(2,0,36,0.8)' },
                  color: 'white',
                  minWidth: '200px',
                  justifyContent: 'flex-start',
                }}
                component={RouterLink}
                to="/vote"
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
                      />
                    );
                  })}
                </Tabs>
              </Box>
  
              {/* RIGHT LOGIN BUTTON */}
              <Box sx={{ minWidth: '200px', display: 'flex', justifyContent: 'flex-end' }}>
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
  