import React from "react";


function NavBar() {
    const logo = require('../img/logo_b.png');
    return (
        <div className="nav-container">
            <img src={logo} className="logo"></img>
        </div>
    );
}

export default NavBar;
