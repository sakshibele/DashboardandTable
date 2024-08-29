import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, CssBaseline, Box } from '@mui/material';
import { Menu as MenuIcon, Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuClick = (menuItem: string) => {
    switch (menuItem) {
      case 'Create Invoice':
        navigate('/create-invoice');
        break;
      case 'My Invoice':
        navigate('/my-invoice');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          backgroundColor: '#8fa3af'
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ color: '#ffffff' }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={open} sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth } }}>
        <Toolbar />
        <Box>
          {['Create Invoice', 'My Invoice', 'History'].map((text, index) => (
            <Box
              key={text}
              sx={{ display: 'flex', alignItems: 'center', p: 1, cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' } }}
              onClick={() => handleMenuClick(text)}
            >
              <Box sx={{ minWidth: 40 }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </Box>
              <Typography variant="body1">{text}</Typography>
            </Box>
          ))}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet /> {/* This renders the routed content */}
      </Box>
    </Box>
  );
};

export default Dashboard;
