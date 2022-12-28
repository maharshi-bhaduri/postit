import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';


function ExpandPostModal(props) {
    setInterval(updateTime, 1000)
    const [currentTime, setCurrentTime] = useState(Date.now())
    const [textColor, setTextColor] = useState(null)

    function updateTime() {
        const newCurrentTime = Date.now()
        setCurrentTime(newCurrentTime)
    }

    var [noteContent, setNoteContent] = useState('Loading...')
    var [expiryString, setExpiryString] = useState('...')
    var expiry = 0
    var postTimeRecorded = 0
    function closeModal() {
        props.onClose()
    }
    function onDeleteClick() {
        props.onDelete(props.name)
        props.onClose()
    }
    useEffect(() => {
        if (props.name) {
            fetch('https://fetchnote.forgiveandforget.workers.dev/?noteId=' + String(props.name), {
                'method': 'get'
            }).then(
                response => response.json()
            ).then(
                data => {
                    noteContent = data['noteContent'];
                    expiry = data.expiresAt
                    postTimeRecorded = data.postedAt
                    setNoteContent(noteContent)
                    var time = (currentTime - postTimeRecorded) / 1000
                    var finalTime = ''

                    if (time > 86400) {
                        var datePosted = new Date(postTimeRecorded)
                        finalTime = datePosted.getDate() + '/' + datePosted.getMonth() + '/' + datePosted.getFullYear()
                    }
                    else {
                        var timeInMins = Math.floor(time / 60)
                        var hrs = Math.floor(timeInMins / 60)
                        var mns = timeInMins % 60

                        var hrsString = hrs > 0 ? String(hrs) + 'h ' : ''
                        finalTime = hrsString + mns + 'm'
                    }
                    var textColorObject = time < 72000 ? (time < 600 ? { color: '#1000ff' } : null) : (expiry > 0 ? { color: '#ff0000' } : null)
                    setExpiryString(finalTime)
                    setTextColor(textColorObject)
                    console.log('finalTime ', finalTime)
                }
            )
        }
    }, [])


    return (
        <div className="modal">
            <div className="overlay" onClick={closeModal}
            ></div>
            <div id='modal' className="expand-post-modal ">
                <div className="btn-top-right">
                    <IconButton onClick={closeModal} >
                        <CloseRoundedIcon fontSize="large" />
                    </IconButton>
                </div>
                <div className="modal-content">
                    {noteContent}
                </div>
                <div className="timebox bottom-left">
                    <img className="timeleft-icon" src={require('../img/clock.png')} />
                    <p className="timeleft-text" style={textColor}>{expiryString}</p>
                </div>
                <div className="delete-button">
                    <IconButton aria-label="delete" onClick={onDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

export default ExpandPostModal;
