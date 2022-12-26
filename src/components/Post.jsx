import React, { useState } from "react";

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
        <p className='see-more' onClick={expand}>... See more</p>
      }
      <div className="timebox">
        <img className="timeleft-icon" src={require('../img/clock.png')} />
        <p className="timeleft-text" style={textColor}>{finalTime}</p>
      </div>
      {
        props.name.length == 40 &&
        <button className="delete-button" onClick={onDeleteClick}>
          Delete
        </button>
      }
    </div>
  );
}

export default Post;
