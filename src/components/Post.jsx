import React from "react";

function Post(props) {
  var time = (Date.now()+(60000*60)-props.expiry)/1000
  time = time < 0 ? 0 : time
  var timeInMins = String(Math.floor(time/60)) + 'm ago'
  // var postColor = time < 1500 ? (time < 300 ? {backgroundColor:'#d7d7ff'} : null) : {backgroundColor:'#ffbbbb'}
  var textColor = time < 3000 ? (time < 600 ? {color:'#1000ff'} : null) : {color:'#ff0000'}

  return (
    <div className="post-card" style={null}>
      {props.content}
      <div className="timebox">
        <p className="timeleft-text" style={textColor}>{timeInMins}</p>
        <img className="timeleft-icon" src={require('../img/clock.png')} />
      </div>
    </div>
  );
}

export default Post;
