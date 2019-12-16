import React, {Component} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

export default function UserButton() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        
    }

    return (
        <div>
            <Fab size="small" aria-label="profile" onClick={handleOpenMenu}>
                <PersonRoundedIcon />
            </Fab>
            <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    )
}