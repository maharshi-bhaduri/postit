import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import List from "./List";
import TextBox from "./TextBox";
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
                console.log("post ", posts)
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

    const postsRenderer = posts.map((post) => (<Post key={post.name} content={post.content} />))

    const content = isLoading ? <div>Loading...</div> : <div>{postsRenderer}</div>

    return (
        <div className="parent">
            <Heading />
            <TextBox onPost={getPosts}/>
            {/* <List postList={posts}/> */}
            {content}
        </div>
    );
}

export default App;
