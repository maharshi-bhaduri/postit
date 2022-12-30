import React from "react";
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InfoIcon from '@mui/icons-material/Info';


function NavBar(props) {
    function triggerAddPost() {
        props.triggerPostModal(true)
    }

    function triggerInfoBox() {
        props.triggerInfoModal(true)
    }
    const logo = require('../img/logo_b.png');
    const cred = require('../img/dev_cred.png');
    return (
        <div className="nav-container">
            <div className="nav-func-group">
                <img src={logo} className="logo" draggable="false"></img>
                {/* <img src={cred} className="cred" draggable="false"></img> */}
                <IconButton
                    onClick={triggerAddPost}>
                    <AddCircleRoundedIcon fontSize="large" />
                </IconButton>
            </div>
            <div className="nav-help-group">
                <IconButton
                    onClick={triggerInfoBox}>
                    <InfoIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    );
}

export default NavBar;
