import React, { useEffect, useState } from "react";


function AddPostModal(props) {
  function closeModal() {
    props.onClose()
    document.getElementById('post-input').value = ''
  }
  function addPost() {
    let content = document.getElementById('post-input').value.trim()

    if (content) {
      fetch('https://updatenote.forgiveandforget.workers.dev/', {
        'method': 'post',
        'body': JSON.stringify({
          noteContent: content
        })
      })
      var tempData = {
        'name': Date.now(),
        'content': content,
        'expiry': String(Date.now() + (24 * 60000 * 60))
      }
      props.onAdd(tempData)
    }
    document.getElementById('post-input').value = ''
  }
  return (
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      <div id='modal' className="add-post-modal">
        <textarea id='post-input' className="modal-text-area" placeholder="Enter your post here...">
        </textarea>
        <button className="post-sub-button" onClick={addPost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default AddPostModal;
