import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, Info, Settings } from '@mui/icons-material';
import { ListItemButton } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer
      sx={{ width: 240, flexShrink: 0 }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><Info /></ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
