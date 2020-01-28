import React from 'react';
import Menu from '@material-ui/core/Menu';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

const StyledFab = styled(Fab)`
    &&& {
        width: 32px;
        height: 32px;
        min-height: 32px;
    }
`;

export default function UserButton(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <StyledFab aria-label="profile" onClick={handleOpenMenu}>
                <PersonRoundedIcon fontSize="small"/>
            </StyledFab>
            <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}