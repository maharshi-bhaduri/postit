import React from "react";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from "react-router-dom";

function Landing() {
    const logo = require('../img/logo_b.png');

    let navigate = useNavigate();
    function gotoPosts() {
        navigate('/posts');
    }

    return (
        <div className="landing-container">
            <h1 className="landing-text">Raise your note-taking game
                to newer heights 🚀</h1>
            <div className="cta-postcloud">
                <h1 className="landing-text">Try</h1>
                <div
                    className='postit' onClick={gotoPosts}>
                    <img src={logo} />
                </div>
            </div>

        </div>
    );
}

export default Landing;
