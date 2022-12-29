import React from "react";
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';


function NavBar(props) {
    function triggerAddPost() {
        props.triggerPostModal(true)
    }
    const logo = require('../img/logo_b.png');
    const cred = require('../img/dev_cred.png');
    return (
        <div className="nav-container">
            <img src={logo} className="logo" draggable="false"></img>
            <img src={cred} className="cred" draggable="false"></img>
            <IconButton
                onClick={triggerAddPost}>
                <AddCircleRoundedIcon fontSize="large" />
            </IconButton>
        </div>
    );
}

export default NavBar;
