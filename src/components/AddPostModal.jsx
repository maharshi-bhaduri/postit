import React, { useEffect, useState } from "react";


function AddPostModal(props) {
  var [disableInput, setDisableInput] = useState(false)
  var expiry = Date.now() + (24 * 60000 * 60)
  function closeModal() {
    props.onClose()
    document.getElementById('post-input').value = ''
  }
  function addPost() {
    setDisableInput(true)
    let content = document.getElementById('post-input').value.trim()
    var noteId = ""
    if (content) {
      fetch('https://updatenote.forgiveandforget.workers.dev/', {
        'method': 'post',
        'body': JSON.stringify({
          'noteContent': content,
          'expiry': expiry
        })
      }).then(
        response => response.json()
      ).then(
        data => {
          noteId = data['noteId']
          var tempData = {
            'name': noteId,
            'metadata': {
              'value': content,
              'expiry': expiry
            }
          }
          props.onAdd(tempData)
        }
      )
    }
    else {
      props.onClose()
    }
  }
  return (
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      <div id='modal' className="add-post-modal">
        <h2 className="modal-heading">Add Post</h2>
        <textarea id='post-input' className="modal-text-area" autoFocus placeholder="Enter your post here...">
        </textarea>
        <button className="post-sub-button" disabled={disableInput} onClick={addPost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default AddPostModal;
