import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from "react-router-dom";


function Post(props) {
  const uuid = localStorage.getItem('uuid');
  const currentTime = Date.now();

  function onDeleteClick() {
    props.onDelete(props.name)
  }

  function expand() {
    props.onExpand(props.name)
  }
  var postTimeRecorded = 0
  var datePosted = new Date()
  var finalTime = ''

  if (props.postTime !== -1) {
    postTimeRecorded = props.postTime
  }
  else {
    postTimeRecorded = currentTime + (24 * 60000 * 60)
  }
  var time = (currentTime - postTimeRecorded) / 1000
  if (time > 86400) {
    datePosted = new Date(postTimeRecorded)
    finalTime = datePosted.getDate() + '/' + (datePosted.getMonth() + 1) + '/' + datePosted.getFullYear()
  }
  else {
    var timeInMins = Math.floor(time / 60)
    var hrs = Math.floor(timeInMins / 60)
    var mns = timeInMins % 60

    var hrsString = hrs > 0 ? String(hrs) + 'h ' : ''
    finalTime = hrsString + mns + 'm'
  }

  var textColor = time < 72000 ? (time < 600 ? { color: '#1000ff' } : null) : (props.expiry > 0 ? { color: '#ff0000' } : null)

  return (
    <div className="post-card" style={null}>
      <div className="pc-user-name">
        {
          props.userName ? props.userName.length > 9 ?
            props.userName.split(' ')[0].length > 9 ? props.userName.split(' ')[0].substring(0, 9) : props.userName.split(' ')[0]
            : props.userName : ''
        }
      </div>
      <div className="launch-icon">
        <Link to={`/post/${props.name}`}>
          <IconButton >
            <LaunchIcon fontSize="small" />
          </IconButton>
        </Link>

      </div>
      {
        props.content.length > 250 ? props.content.substring(0, 250) :
          (
            props.content.split(/\r?\n|\r|\n/g).length > 3 ? props.content.split(/\r?\n|\r|\n/g).slice(0, 3).join('\n') : props.content
          )
      }
      {
        (props.content.length > 250 || props.content.split(/\r?\n|\r|\n/g).length > 3) &&
        <p className='read-more' onClick={expand}>... Read more</p>
      }
      <div className="timebox bottom-left">
        <img className="timeleft-icon" src={require('../img/clock.png')} />
        <p className="timeleft-text" style={textColor}>{finalTime}</p>
      </div>
      {
        (props.uuid == uuid || props.uuid == '') &&
        <div className="delete-button">
          <IconButton aria-label="delete" onClick={onDeleteClick}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      }
    </div>
  );
}

export default Post;
