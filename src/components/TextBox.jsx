import React, { useState, useEffect } from "react";

async function hash(str) {
    const buffer = new TextEncoder('utf-8').encode(str);
    const digest = await crypto.subtle.digest('SHA-1', buffer);

    // Convert digest to hex string
    const result = Array.from(new Uint8Array(digest)).map(x => x.toString(16).padStart(2, '0')).join('');
    return result;
}

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
            'name': hash(String(Date.now()) + String(Math.floor(Math.random() * 1000))),
            'content': content,
            'expiry': String(Date.now() + (24 * 60000 * 60))
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
