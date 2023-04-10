import React, { useEffect, useState } from "react";
import ExpandPostModal from "./ExpandPostModal";
import NavBar from "./NavBar";
import AddPostModal from "./AddPostModal";
import InfoModal from "./InfoModal";
import PublicPosts from "./PublicPosts";
import PostPage from "./PostPage";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function MainSection(props) {
    const [addPostFlag, setAddPostFlag] = useState(false)
    const [infoFlag, setInfoFlag] = useState(false)
    const [expandPostFlag, setExpandPostFlag] = useState('')
    const [posts, setPosts] = useState([])
    const { user, isAuthenticated, isLoading } = props;
    const uuid = localStorage.getItem('uuid')

    let headers = {}

    let navigate = useNavigate();

    function addPost(post) {
        setAddPostFlag(false);
        setPosts(oldposts => {
            return [...oldposts, post];
        });
    }
    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = () => {
        if (user && user.sub) {
            headers = {
                headers: new Headers({
                    'uuid': uuid
                })
            }
        }
        fetch('https://listnotes.postcloud.workers.dev/', headers
        ).then(
            response => response.json()
        ).then(
            data => {
                setPosts(data)
                posts.sort((a, b) => {
                    return a.expiry - b.expiry;
                });
            }
        ).catch(err => {
            console.log("An error occured. Error: ", err)
        }
        )
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
                    navigate('/');
                }
            }
        )
    }

    function closeModal() {
        setAddPostFlag(false);
        setExpandPostFlag('');
        setInfoFlag(false);
    }

    function startPostModal() {
        setAddPostFlag(true)
    }

    function startInfoModal() {
        setInfoFlag(true)
    }

    function expandPost(expandPostName) {
        setExpandPostFlag(expandPostName)
    }

    return (
        <div className="parent">
            <NavBar triggerPostModal={startPostModal} triggerInfoModal={startInfoModal} />
            {
                addPostFlag && <AddPostModal onAdd={addPost} onClose={closeModal} user={user} />
            }
            {
                expandPostFlag && <ExpandPostModal onDelete={deletePost} onClose={closeModal} name={expandPostFlag} />
            }
            {
                infoFlag && <InfoModal onClose={closeModal} />
            }
            <Routes>
                <Route exact path='/' element={<PublicPosts onExpand={expandPost} postList={posts} onDelete={deletePost} />} >
                    {/* <PublicPosts onExpand={expandPost} postList={posts} onDelete={deletePost} /> */}
                </Route>
                <Route exact path='/post/:id' element={<PostPage onDelete={deletePost} />}>
                    {/* <PostPage ></PostPage> */}
                </Route>
            </Routes>
        </div>
    );
}

export default MainSection;
