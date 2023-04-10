import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Post from './Post';

function PublicPosts(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [postsRenderer, setPostsRenderer] = useState(null);
    const noPostText = <p className="no-post">No posts to show 🫥</p>

    useEffect(() => {
        if (props.postList) {
            const sortedPosts = props.postList.sort(
                (a, b) => b.metadata.postTime - a.metadata.postTime
            );
            setPostsRenderer(
                sortedPosts.map((post, index) => (
                    <Post
                        onExpand={expandPost}
                        onDelete={deletePost}
                        id={index}
                        key={post.name}
                        name={post.name}
                        content={post.metadata.value}
                        expiry={post.metadata.expiry}
                        postTime={post.metadata.postTime || -1}
                        uuid={post.metadata.uuid}
                        userName={post.metadata.userName}
                    />
                ))
            );
            setIsLoading(false);
        }
    }, [props.postList]);

    function expandPost(expandPostName) {
        props.onExpand(expandPostName);
    }

    function deletePost(deletePostName) {
        props.onDelete(deletePostName);
    }

    return (
        <div className="parent">
            <div className="nav-spacer"></div>
            <div className="section-heading-posts">
                <h2>Public Posts</h2>
            </div>
            <div className="post-container">
                {postsRenderer ? postsRenderer.length > 0 ? postsRenderer : noPostText : noPostText}
                {isLoading && <Loader />}
            </div>
        </div>
    );
}

export default PublicPosts;
