import React, { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from "react-router-dom";

function AddPostModal(props) {
  var [disableInput, setDisableInput] = useState(false)
  var [expiryTime, setExpiryTime] = useState(-1)
  const { user } = props;

  const uuid = localStorage.getItem('uuid') || ''

  let navigate = useNavigate();

  var expiry = -1
  if (expiryTime !== -1) {
    expiry = Date.now() + (expiryTime * 60000 * 60)
  }

  function closeModal() {
    document.getElementById('post-input').value = ''
    props.onClose()
  }
  function handleExpiryChange(event) {
    setExpiryTime(event.target.value)
  }
  function addPost() {
    setDisableInput(true)
    let content = document.getElementById('post-input').value.trim()
    var noteId = "";

    if (content) {
      let dataPackage = {
        'noteContent': content,
        'expiry': expiryTime == -1 ? -1 : (Date.now() + (expiryTime * 60000 * 60)),
        'postTime': Date.now()
      }
      if (user && user.name && user.sub) {
        dataPackage['userName'] = user.name;
        dataPackage['uuid'] = uuid;
      }
      fetch('https://updatenote.postcloud.workers.dev/', {
        'method': 'post',
        'body': JSON.stringify(dataPackage)
      }).then(
        response => response.json()
      ).then(
        data => {
          noteId = data['noteId']
          var tempData = {
            'name': noteId,
            'metadata': {
              'value': content,
              'expiry': expiry,
              'postTime': Date.now(),
              'userName': user && user.name ? user.name : '',
              'uuid': uuid
            }
          }
          props.onAdd(tempData)
        }
      )
    }
    else {
      props.onClose()
    }
    navigate('/');
  }
  return (
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      <div id='modal' className="add-post-modal">
        <h2 className="modal-heading">Add Post</h2>
        <div className="btn-top-right">
          <IconButton disabled={disableInput} onClick={closeModal} >
            <CloseRoundedIcon fontSize="large" />
          </IconButton>
        </div>
        <textarea id='post-input' disabled={disableInput} className="modal-text-area" autoFocus placeholder="Enter your post here...">
        </textarea>
        <div className="post-sub-button">
          <div className="expiry-selector-container">
            <label>Expire post:</label>
            <select name="expiryTime" disabled={disableInput} className="expiry-time-selector" onChange={handleExpiryChange}  >
              <option value={-1}>Never</option>
              <option value={1}>1 hour</option>
              <option value={12}>12 hours</option>
              <option value={24}>24 hours</option>
            </select>
          </div>
          <IconButton disabled={disableInput} onClick={addPost} className='send-button' >
            <SendIcon fontSize="medium" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default AddPostModal;
