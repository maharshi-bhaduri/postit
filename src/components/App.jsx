import React, { useEffect, useReducer, useState } from "react";
import Loader from "./Loader";
import ExpandPostModal from "./ExpandPostModal";
import NavBar from "./NavBar";
import Post from './Post';
import AddPostModal from "./AddPostModal";


function App() {

    const [isLoading, setIsLoading] = useState(true)
    const [addPostFlag, setAddPostFlag] = useState(false)
    const [expandPostFlag, setExpandPostFlag] = useState('')
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

    function deletePost(deleteName) {
        fetch('https://deletenote.forgiveandforget.workers.dev/', {
            'method': 'post',
            'body': JSON.stringify({
                noteId: deleteName
            })
        })
        console.log(posts)
        setPosts(oldposts => {
            return oldposts.filter((item) => { return item.name !== deleteName });
        });
    }

    function closeModal() {
        setAddPostFlag(false);
        setExpandPostFlag('')
    }

    function startPostModal() {
        setAddPostFlag(true)
    }

    function expandPost(expandPostName) {
        setExpandPostFlag(expandPostName)
        console.log(expandPostFlag)
    }

    const postsRenderer = posts.sort(
        (a, b) => b.metadata.expiry - a.metadata.expiry
    ).map(
        (post, index) => (
            <Post onExpand={expandPost}
                onDelete={deletePost}
                id={index}
                key={post.name}
                name={post.name}
                content={post.metadata.value}
                expiry={post.metadata.expiry} />
        )
    )

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
            {
                expandPostFlag && <ExpandPostModal onDelete={deletePost} onClose={closeModal} name={expandPostFlag} />
            }

        </div>
    );
}

export default App;
