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
  } from '@mui/material';
  import { Link as RouterLink, useLocation } from 'react-router-dom';
  import DrawerComp from './drawer';
  
  interface NavBarProps {
    links: string[];
  }
  
  export default function NavBar({ links }: NavBarProps) {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  
    const location = useLocation();
  
    // Type the helper function
    const getPath = (link: string): string => `/${link.toLowerCase()}`;
  
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
                        sx={{ color: 'black' }}
                      />
                    );
                  })}
                </Tabs>
              </Box>
  
              {/* RIGHT BALANCER */}
              <Box sx={{ minWidth: '200px' }} />
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
  