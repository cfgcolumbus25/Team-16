import { useState } from 'react';
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link as RouterLink } from 'react-router-dom';
import { useThemeMode } from '../contexts/ThemeContext'; 

interface DrawerCompProps {
  links: string[];
}

export default function DrawerComp({ links }: DrawerCompProps) {
  const [open, setOpen] = useState(false);
  const { mode, toggleTheme } = useThemeMode();

  const getPath = (link: string): string => {
    if (link.toLowerCase() === 'clep search') {
      return '/';
    }
    return `/${link.toLowerCase()}`;
  };

  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            backgroundImage: mode === 'dark'
              ? 'linear-gradient(135deg, rgba(30, 58, 95, 0.95) 0%, rgba(15, 31, 53, 0.95) 100%)'
              : 'radial-gradient(circle,rgba(255, 203, 5, 1) 0%, rgba(255, 255, 255, 1) 100%)',
            transition: 'background-image 0.3s ease',
          },
        }}
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <Typography variant="h6" sx={{ color: mode === 'dark' ? '#e8f0f8' : 'black', mb: 2 }}>
            Modern States
          </Typography>

          <List>
            {links.map((link, index) => {
              const path = getPath(link);
              return (
                <ListItemButton
                  key={index}
                  component={RouterLink}
                  to={path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText
                    sx={{
                      color: mode === 'dark' ? '#e8f0f8' : 'black',
                      textAlign: 'center',
                      transition: 'color 0.3s ease',
                    }}
                    primary={link}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          marginLeft: 'auto',
          color: mode === 'dark' ? '#a8d0f0' : 'black',
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(168, 208, 240, 0.2)' : 'rgba(0, 0, 0, 0.2)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
}
