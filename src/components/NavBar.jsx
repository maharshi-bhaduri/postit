import React from "react";


function NavBar() {
    const logo = require('../img/logo_b.png');
    const addPost = require('../img/add_post.png');
    const addPostHover = require('../img/add_post_hover.png');
    const addPostClick = require('../img/add_post_click.png');
    return (
        <div className="nav-container">
            <img src={logo} className="logo" draggable="false"></img>
            <img src={addPost} className="add-post"
            onMouseOver={e => (e.currentTarget.src = addPostHover)}
            onMouseLeave={e => (e.currentTarget.src = addPost)}
            onMouseDown={e => (e.currentTarget.src = addPostClick)}
            onMouseUp={e => (e.currentTarget.src = addPostHover)}
                draggable="false"
            ></img>
            
        </div>
    );
}

export default NavBar;
