import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
// import IconButton from '@mui/icons-material/*';


function Post(props) {
  setInterval(updateTime, 1000)
  const [currentTime, setCurrentTime] = useState(Date.now())

  function updateTime() {
    const newCurrentTime = Date.now()
    setCurrentTime(newCurrentTime)
  }

  function onDeleteClick() {
    props.onDelete(props.name)
  }

  function expand() {
    props.onExpand(props.name)
  }

  var time = (currentTime + (24 * 60000 * 60) - props.expiry) / 1000
  time = time < 0 ? 0 : time
  var timeInMins = Math.floor(time / 60)
  var hrs = Math.floor(timeInMins / 60)
  var mns = timeInMins % 60

  var hrsString = hrs > 0 ? String(hrs) + 'h ' : ''
  var finalTime = hrsString + mns + 'm'
  var textColor = time < 72000 ? (time < 600 ? { color: '#1000ff' } : null) : { color: '#ff0000' }

  return (
    <div className="post-card" style={null}>
      {props.content.substring(0, 250)}
      {
        props.content.length > 250 &&
        <p className='read-more' onClick={expand}>... Read more</p>
      }
      <div className="timebox top-right">
        <img className="timeleft-icon" src={require('../img/clock.png')} />
        <p className="timeleft-text" style={textColor}>{finalTime}</p>
      </div>
      {
        props.name.length == 40 &&
        <div className="delete-button">
          <IconButton aria-label="delete" onClick={onDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      }
    </div>
  );
}

export default Post;
