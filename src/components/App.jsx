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
    const year = (new Date()).getFullYear()
    // const [currentTime, setCurrentTime] = useState(Date.now())

    // function updateTime() {
    //     const newCurrentTime = Date.now();
    //     setCurrentTime(newCurrentTime);
    // }

    // setInterval(updateTime, 1000)
    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = () => {
        fetch('https://listnotes.postcloud.workers.dev/').then(
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
        fetch('https://deletenote.postcloud.workers.dev/', {
            'method': 'post',
            'body': JSON.stringify({
                noteId: deleteName
            })
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.status == 'success') {
                    setPosts(oldposts => {
                        return oldposts.filter((item) => { return item.name !== deleteName });
                    });
                }

                // setPosts(data)
                // setIsLoading(false)
                // posts.sort((a, b) => {
                //     return a.expiry - b.expiry;
                // });
            }
        )
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
    }

    const postsRenderer = posts.sort(
        (a, b) => b.metadata.postTime - a.metadata.postTime
    ).map(
        (post, index) => (
            <Post onExpand={expandPost}
                onDelete={deletePost}
                id={index}
                key={post.name}
                name={post.name}
                content={post.metadata.value}
                expiry={post.metadata.expiry}
                postTime={post.metadata.postTime || -1} />
        )
    )

    const content = isLoading ? <Loader /> : postsRenderer
    const noPostContent = <p className="no-post">No posts to show</p>

    return (
        <div className="parent">
            <NavBar triggerPostModal={startPostModal} />
            <div className="nav-spacer">
            </div>
            <div className="section-heading-posts">
                <h2 >
                    Posts
                </h2>
            </div>
            <div className="post-container">
                {isLoading ? <Loader /> : content}
            </div>
            {
                posts.length == 0 && !isLoading && noPostContent
            }
            {
                addPostFlag && <AddPostModal onAdd={addPost} onClose={closeModal} />
            }
            {
                expandPostFlag && <ExpandPostModal onDelete={deletePost} onClose={closeModal} name={expandPostFlag} />
            }
            <footer>© {year} Maharshi Bhaduri Design</footer>
        </div>
    );
}

export default App;
