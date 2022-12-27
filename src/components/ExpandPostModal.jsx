import React, { useState, useEffect } from "react";


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
                    setNoteContent(noteContent)
                    var time = (currentTime + (24 * 60000 * 60) - expiry) / 1000
                    time = time < 0 ? 0 : time
                    var timeInMins = Math.floor(time / 60)
                    var hrs = Math.floor(timeInMins / 60)
                    var mns = timeInMins % 60

                    var hrsString = hrs > 0 ? String(hrs) + 'h ' : ''
                    var finalTime = hrsString + mns + 'm'
                    var textColorObject = time < 72000 ? (time < 600 ? { color: '#1000ff' } : null) : { color: '#ff0000' }
                    setExpiryString(finalTime)
                    setTextColor(textColorObject)
                }
            )
        }
    }, [])




    return (
        <div className="modal">
            <div className="overlay" onClick={closeModal}
            ></div>
            <div id='modal' className="expand-post-modal ">
                <button className="btn-top-right"
                    onClick={closeModal}>
                    Close
                </button>
                <div className="modal-content">
                    {noteContent}
                </div>
                <div className="timebox bottom-left">
                    <img className="timeleft-icon" src={require('../img/clock.png')} />
                    <p className="timeleft-text" style={textColor}>{expiryString}</p>
                </div>
                <button className="delete-button"
                    onClick={onDeleteClick}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ExpandPostModal;
