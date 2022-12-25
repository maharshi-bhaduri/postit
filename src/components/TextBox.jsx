import React, { useState, useEffect } from "react";


function TextBox(props) {
    function postData() {
        let content = document.getElementById('post-input').value.trim()
        if (content) {
            fetch('https://updatenote.forgiveandforget.workers.dev/', {
                'method': 'post',
                'body': JSON.stringify({
                    noteContent: content
                })
            })
        }
        var tempData = {
            'name': Date.now(),
            'content': content,
            'expiry': String(Date.now()+(24*60000*60))
        }
        props.onAdd(tempData)
        document.getElementById('post-input').value = ''
    }
    return (
        <div className="pallette make-it-slow">
            <input id="post-input" placeholder="Just post it ✔" autoComplete="off" />
            <button type="submit" onClick={() => postData()}>Post</button>
        </div>
    );
}

export default TextBox;
