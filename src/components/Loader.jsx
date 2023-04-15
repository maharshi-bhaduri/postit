import React, { useState, useEffect } from "react";

function Loader(props) {
    return (
        <div className={`loader ${props.type == 'black' ? 'loader-black' : ''}`}>
        </div>
    );
}

export default Loader;
