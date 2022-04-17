import React, { useEffect, useState } from "react";
import Post from "./Post";


function List() {

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
        console.log("post ",posts)
      }
    ).catch(err => {
      setIsLoading(false)
      console.log("An error occured. Error: ", err)
    }
    )
  }

  const postsRenderer = posts.map((post) => (<li key={post.name}>{post.content}</li>))

  const content = isLoading ? <div>Loading</div> : <div>{postsRenderer}</div>

  return (
    <div>
      {content}
    </div>
  );
}

export default List;
