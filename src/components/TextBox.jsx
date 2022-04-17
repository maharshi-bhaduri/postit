import React, {useState, useEffect} from "react";

function postData() {

    let content = document.getElementById('post-input').value
    fetch('https://updatenote.forgiveandforget.workers.dev/', {
        'method': 'post',
        'body': JSON.stringify({
            noteContent: content
        })
    })
    document.getElementById('post-input').value = ''
}


function TextBox() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = () => {
        fetch('https://listnotes.forgiveandforget.workers.dev/').then(
            response => response.json()
        ).then(
            data => {
                setPosts(data)
                setIsLoading(false)
                console.log("post ", posts)
            }
        ).catch(err => {
            setIsLoading(false)
            console.log("An error occured. Error: ", err)
        }
        )
    }

    return (
        <div className="pallette make-it-slow">
            {/* <div className="input" contentEditable id="input">
            <span className="placeholder" id="placeholder">
                Just post it ✔
            </span>
            </div> */}
            <input id="post-input" placeholder="Just post it ✔" autoComplete="off" />
            <button type="submit" onClick={() => postData()}>Post</button>
        </div>
    );
}

export default TextBox;
