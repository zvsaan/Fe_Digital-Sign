import { Box, IconButton, useTheme, Popover, List, ListItem, ListItemIcon, ListItemText, Avatar, Divider, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutNotification, setLogoutNotification] = useState({ open: false, message: '', severity: 'success' });

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      // Lakukan logout melalui API
      const response = await fetch('http://127.0.0.1:8000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Mengirim token JWT untuk autentikasi
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Jika logout berhasil, set notifikasi
        setLogoutNotification({ open: true, message: 'Logout successful', severity: 'success' });
        // Hapus token dari penyimpanan lokal setelah logout berhasil
        localStorage.removeItem('token');
        // Redirect ke halaman login
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000); // Redirect setelah 3 detik
      } else {
        // Jika logout gagal, tangani kesalahan
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Set notifikasi jika logout gagal
      setLogoutNotification({ open: true, message: 'Failed to logout. Please try again.', severity: 'error' });
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* ICONS */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton onClick={handlePopoverOpen}>
            <PersonOutlinedIcon />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box p={2}>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} textAlign="center">
                  <Avatar />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List>
                    <ListItem button onClick={handlePopoverClose}>
                      <ListItemIcon>
                        <SettingsOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button onClick={handlePopoverClose}>
                      <ListItemIcon>
                        <AccountCircleOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={handlePopoverClose}>
                      <ListItemIcon>
                        <HelpOutlineOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="FAQ" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Popover>
        </Box>
      </Box>
      {/* Logout Notification */}
      <Snackbar
        open={logoutNotification.open}
        autoHideDuration={6000}
        onClose={() => setLogoutNotification({ ...logoutNotification, open: false })}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setLogoutNotification({ ...logoutNotification, open: false })}
          severity={logoutNotification.severity}
        >
          {logoutNotification.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Topbar;