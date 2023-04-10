import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { Tooltip } from "@mui/material";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Tooltip title="Log In" arrow>
            <IconButton onClick={() => loginWithRedirect()} >
                <LoginIcon fontSize="large" />
            </IconButton>
        </Tooltip>
    );
};

export default LoginButton;