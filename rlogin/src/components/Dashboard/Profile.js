import React, { useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'; 
const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleChangePassword = () => {
    handleClose();
    navigate('/change-password');
  };


  const username = localStorage.getItem('username') || 'Guest';

  return (
    <Box sx={{ position: 'absolute', top: 10, right: 20 }}>
      <Tooltip title="Profile">
        <IconButton onClick={handleClick} size="large" sx={{ color: 'white' }}>
          <Avatar sx={{ bgcolor: '#26A69A' }}>
            <AccountCircleIcon />
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { backgroundColor: '#102127', color: '#FFF' },
        }}
      >
        <Box sx={{ padding: '10px 15px' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {username}
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: '#26A69A' }} />

        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
