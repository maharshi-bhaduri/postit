import React from "react";
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Tooltip } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";


function NavBar(props) {

    const { logout } = useAuth0();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function triggerAddPost() {
        props.triggerPostModal(true)
    }

    function triggerInfoBox() {
        props.triggerInfoModal(true)
    }
    const logo = require('../img/logo_b.png');
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div className="nav-container">
            <div className="nav-content-wrapper">
                <div className="nav-func-group">
                    <Link to='/' className="nav-logo">
                        <img src={logo} className="logo" draggable="false"></img>
                    </Link>

                    <Tooltip title="Add Post" arrow>
                        <IconButton
                            onClick={triggerAddPost}>
                            <AddCircleRoundedIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="nav-help-group">
                    <Tooltip title="About" arrow>
                        <IconButton
                            onClick={triggerInfoBox}>
                            <InfoIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    {
                        !isAuthenticated &&
                        <LoginButton></LoginButton>
                    }
                    {
                        isAuthenticated &&

                        <div className="profile-pic-container">
                            <Tooltip title="Account" arrow>
                                <IconButton
                                    onClick={handleMenuOpen}>
                                    <img className="profile-pic" src={user.picture} alt={user.name} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                className="account-menu"
                            >
                                <MenuItem>Private Posts</MenuItem>
                                <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</MenuItem>
                            </Menu>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default NavBar;
