import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import { useParams } from "react-router-dom";


function PostPage(props) {
    const [textColor, setTextColor] = useState(null)
    var [noteContent, setNoteContent] = useState('Loading...')
    var [userName, setUserName] = useState('...')
    var [expiryString, setExpiryString] = useState('...')
    const [noteUUID, setNoteUUID] = useState('1')
    var expiry = 0
    var retentionTime = 0
    const uuid = localStorage.getItem('uuid') || ''
    const { id } = useParams();

    function onDeleteClick() {
        props.onDelete(id)
        // props.onClose()
    }
    useEffect(() => {
        if (id) {
            fetch('https://fetchnote.postcloud.workers.dev/?noteId=' + String(id), {
                'method': 'get'
            }).then(
                response => response.json()
            ).then(
                data => {
                    noteContent = data['noteContent'];
                    expiry = data.expiresAt
                    var postTimeRecorded = data.postedAt

                    retentionTime = Math.floor((expiry - postTimeRecorded) / 1000)
                    setNoteContent(noteContent)
                    setUserName(data['userName'])
                    setNoteUUID(data['uuid'])
                    var time = (Date.now() - postTimeRecorded) / 1000
                    var finalTime = ''

                    if (time > 86400) {
                        var datePosted = new Date(postTimeRecorded)
                        var d = String(datePosted.getDate())
                        var m = String(datePosted.getMonth() + 1)
                        var y = String(datePosted.getFullYear())

                        finalTime = `${d}/${m}/${y}`
                    }
                    else {
                        var timeInMins = Math.floor(time / 60)
                        var hrs = Math.floor(timeInMins / 60)
                        var mns = timeInMins % 60

                        var hrsString = hrs > 0 ? String(hrs) + 'h ' : ''
                        finalTime = hrsString + mns + 'm'
                    }
                    var textColorObject = time < (retentionTime * 0.9) ? (time < 600 ? { color: '#1000ff' } : null) : (expiry > 0 ? { color: '#ff0000' } : null)
                    setExpiryString(finalTime)
                    setTextColor(textColorObject)
                }
            )
        }

    }, [])
    return (
        <div className="post-card-solo-wrapper">
            <div id='modal' className="post-card-solo">
                {/* <div className="btn-top-right">
                    <IconButton onClick={closeModal} >
                        <CloseRoundedIcon fontSize="large" />
                    </IconButton>
                </div> */}
                <div className="pc-user-name">
                    {userName}
                </div>
                <div className="modal-content">
                    {noteContent}
                </div>
                <div className="timebox bottom-left">
                    <img className="timeleft-icon" src={require('../img/clock.png')} />
                    <p className="timeleft-text" style={textColor}>{expiryString}</p>

                </div>

                {
                    (uuid == noteUUID || noteUUID == '') &&
                    < div className="delete-button">
                        <IconButton aria-label="delete" onClick={onDeleteClick}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>

                }
            </div>
        </div>
    );
}

export default PostPage;
