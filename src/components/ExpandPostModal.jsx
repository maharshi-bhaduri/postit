import React, { useState, useEffect } from "react";


function ExpandPostModal(props) {
    var [noteContent, setNoteContent] = useState('Loading...')
    function closeModal() {
        props.onClose()
    }
    function onDeleteClick() {
        props.onDelete(props.name)
        props.onClose()
    }

    if (props.name) {
        fetch('https://fetchnote.forgiveandforget.workers.dev/?noteId=' + String(props.name), {
            'method': 'get'
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data);
                noteContent = data['noteContent'];
                setNoteContent(noteContent)
            }
        )
    }
    return (
        <div className="modal">
            <div className="overlay" onClick={closeModal}
            ></div>
            <div id='modal' className="expand-post-modal ">
                {noteContent}
                <button className="post-sub-button"
                    onClick={onDeleteClick}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ExpandPostModal;
