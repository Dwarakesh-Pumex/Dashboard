import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  Tooltip,
  Typography,
  Divider,
  Input,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const username = localStorage.getItem('username') || 'Guest';



  useEffect(() => {
    setFirstName(localStorage.getItem('firstName') || '');
    setLastName(localStorage.getItem('lastName') || '');
  }, []);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleChangePassword = () => {
    handleClose();
    navigate('/changepassword');
  };

  const handleSaveName = () => {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    setIsEditing(false);

  };

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
          sx: { backgroundColor: '#102127', color: '#FFF', padding: '10px' },
        }}
      >
        <Box sx={{ padding: '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Profile</Typography>
          <IconButton size="small" sx={{ color: 'white' }} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <SaveIcon onClick={handleSaveName} /> : <EditIcon />}
          </IconButton>
        </Box>

        <Divider sx={{ backgroundColor: '#26A69A', marginBottom: '10px' }} />

        {isEditing ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingX: '15px' }}>
            <text>First Name</text>
            <Input
              label="First Name"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ color:'black',backgroundColor: 'white', borderRadius: '5px' }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <text>Last Name</text>
            <Input
              label="Last Name"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ color:'black',backgroundColor: 'white', borderRadius: '5px' }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
        ) : (
          <Box sx={{ paddingX: '15px', paddingBottom: '10px' }}>
            <Typography variant="body1">
             {firstName || lastName ? `${firstName || ""} ${lastName || ""}`.trim() : "N/A"}
             </Typography>
            <Typography variant="body1">{username}</Typography>
          </Box>
        )}

        <Divider sx={{ backgroundColor: '#26A69A', margin: '10px 0' }} />
        <div style={{display: 'flex', justifyContent: 'space-between',marginLeft:'15px'}}>
        <button onClick={handleChangePassword}>Change Password</button>
        </div>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
