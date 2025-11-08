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

interface DrawerCompProps {
  links: string[];
}

export default function DrawerComp({ links }: DrawerCompProps) {
  const [open, setOpen] = useState(false);
  const getPath = (link: string): string => {
    if (link.toLowerCase() === 'clep search') {
      return '/';
    }
    return `/${link.toLowerCase()}`;
  };

  return (
    <>
      {/* Drawer */}
      <Drawer
        PaperProps={{
          sx: {
            backgroundImage:
              'radial-gradient(circle,rgba(255, 203, 5, 1) 0%, rgba(255, 255, 255, 1) 100%)',
          },
        }}
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: 'black', marginBottom: 2 }}>
            Modern States
          </Typography>

          <List>
            {links.map((link, index) => {
              const path = getPath(link); // This will now be '/' for 'CLEP Search'
              return (
                <ListItemButton
                  key={index}
                  component={RouterLink}
                  to={path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText
                    sx={{ color: 'black', textAlign: 'center' }}
                    primary={link}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* Menu Button */}
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          marginLeft: 'auto',
          color: 'black',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
        }}
      >
        <MenuRoundedIcon />
      </IconButton>
    </>
  );
}