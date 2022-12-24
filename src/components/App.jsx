import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import List from "./List";
import TextBox from "./TextBox";
import NavBar from "./NavBar";
import Post from './Post'


function App() {

    const [isLoading, setIsLoading] = useState(true)
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

    const postsRenderer = posts.sort(
        (a, b) => b.expiry - a.expiry
        ).map((post) => (<Post key={post.name} content={post.content} expiry={post.expiry} />))

    const content = isLoading ? <div className="loading-card">Loading posts...</div> : <div className="post-container">{postsRenderer}</div>

    return (
        <div className="parent">
            <NavBar /> 
            <TextBox />
            {content}
        </div>
    );
}

export default App;
