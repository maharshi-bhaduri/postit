import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
        domain="dev-7lfyg0i2kwghec2h.us.auth0.com"
        clientId="gM9D8ziA0O17TPycEWSru7AEDsWAtkUa"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);

// remove this component