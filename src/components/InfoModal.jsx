import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';


function InfoModal(props) {

    const sign = require('../img/signature.png');

    function closeModal() {
        props.onClose()
    }
    return (
        <div className="modal">
            <div className="overlay" onClick={closeModal}
            ></div>
            <div id='modal' className="expand-post-modal ">
                <div className="btn-top-right">
                    <IconButton onClick={closeModal} >
                        <CloseRoundedIcon fontSize="large" />
                    </IconButton>
                </div>
                <div className="modal-content">
                    <p>PostCloud was developed as a hobby project using React served by CloudFlare Workers at the backend.</p>
                    <p>It is still in development so please bear with the changes in the UI and the random cleardown of
                        any posts you may have saved here. </p>
                    <p>Thank you for your patience!</p>
                    <img src={sign} className="sign" draggable="false"></img>
                </div>
            </div>
        </div>
    );
}

export default InfoModal;
