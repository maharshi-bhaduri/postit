import React, { useEffect, useReducer, useState } from "react";
import Loader from "./Loader";
import TextBox from "./TextBox";
import NavBar from "./NavBar";
import Post from './Post';
import AddPostModal from "./AddPostModal";


function App() {

    const [isLoading, setIsLoading] = useState(true)
    const [addPostFlag, setAddPostFlag] = useState(false)
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
                posts.sort((a, b) => {
                    return a.expiry - b.expiry;
                });
            }
        ).catch(err => {
            setIsLoading(false)
            console.log("An error occured. Error: ", err)
        }
        )
    }

    function addPost(post) {
        setAddPostFlag(false);
        setPosts(oldposts => {
            return [...oldposts, post];
        });
    }

    function deletePost(name, id) {
        fetch('https://deletenote.forgiveandforget.workers.dev/', {
            'method': 'post',
            'body': JSON.stringify({
                noteId: name
            })
        })
        setPosts(oldposts => {
            return oldposts.filter((item, index) => index !== id);
        });
    }

    function closeModal() {
        setAddPostFlag(false);
    }

    function startPostModal() {
        setAddPostFlag(true)
    }

    const postsRenderer = posts.sort(
        (a, b) => b.expiry - a.expiry
    ).map((post, index) => (<Post onDelete={deletePost} id={index} key={post.name} name={post.name} content={post.content} expiry={post.expiry} />))

    const content = isLoading ? <Loader /> : postsRenderer

    return (
        <div className="parent">
            <NavBar triggerPostModal={startPostModal} />
            {/* <TextBox onAdd={addPost} /> */}
            <div className="post-container">
                {isLoading ? <Loader /> : content}
            </div>
            {
                addPostFlag && <AddPostModal onAdd={addPost} onClose={closeModal} />
            }
        </div>
    );
}

export default App;
