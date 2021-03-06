import React, { useState, useEffect } from "react";

function postData() {
    let content = document.getElementById('post-input').value
    if (content) {
        fetch('https://updatenote.forgiveandforget.workers.dev/', {
            'method': 'post',
            'body': JSON.stringify({
                noteContent: content
            })
        })
        document.getElementById('post-input').value = ''
    }
}

function TextBox() {

    return (
        <div className="pallette make-it-slow">
            {/* <div className="input" contentEditable id="input">
            <span className="placeholder" id="placeholder">
                Just post it ✔
            </span>
            </div> */}
            <input id="post-input" placeholder="Just post it ✔" autoComplete="off" />
            <button type="submit" onClick={() => postData()}>Post</button>
        </div>
    );
}

export default TextBox;
