import React, { useRef, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
const Posts = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [userPosts, setUserPosts] = useState([]);
    const [showPostsDetails, setShowPostsDetails] = useState(false);
    const [showPostInfo, setShowPostInfo] = useState(false);
    const [viewpostUpdate, setViewpostUpdate] = useState(false);
    const [nextId, setNextId] = useState();
    const [post, setPost] = useState();
    const [selectedPost, setSelectedPost] = useState(null);

    const [showPostsComments, setShowPostsComments] = useState(false);
    const [postsComments, setPostsComments] = useState([]);


    const { register, handleSubmit } = useForm();
    const postId = useRef(0);
    useEffect(() => {
        //users todo
        fetch(`http://localhost:3000/posts?userId=${user.id}`)
            .then(response => response.json())
            .then(json => setUserPosts(json));

        //   .then(json => {
        // setUserTodos(json.map(j=>{return{...j,display:false}}));
        // localStorage.setItem('userPosts', JSON.stringify(json));
        fetch("http://localhost:3000/nextIDs/3")
            .then(response => {
                if (!response.ok)
                    throw 'Error' + response.status + ': ' + response.statusText;
                return response.json();
            })
            .then((json) => {
                setNextId(json.nextId)
            }).catch(ex => alert(ex));
    }, [])


    function AddPost(data) {
        console.log(userPosts)
        const newPost = { userId: user.id, id: `${nextId}`, title: data.title, body: data.body }
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then(response => {
            if (!response.ok)
                throw 'Error' + response.status + ': ' + response.statusText;
            //return response.json();//???????????????????????
        }).then(() => {
            setUserPosts(prev => [...prev, newPost])
            setShowPostsDetails(false);
            setNextId((prev) => prev + 1);
        }).catch((ex) => alert(ex));
    };

    const DeletePost = async (post) => {
        alert('Do you want to delete this post?')
        try {
            await fetch(`http://localhost:3000/posts/${post.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setUserPosts((prevUserPosts) => prevUserPosts.filter((item) => item.id !== post.id));
        } catch (error) {
            console.error('שגיאה במחיקת הפוסט', error);
        }
    };

    const UpdatePost = async (data) => {
        try {
            await fetch(`http://localhost:3000/posts/${postId.current}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: data.title,
                    body: data.body
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            setUserPosts((prevUserPosts) =>
                prevUserPosts.map((userPost) =>
                    userPost.id === postId.current
                        ? {
                            ...userPost,
                            title: data.title,
                            body: data.body,
                        }
                        : userPost
                )
            );
            setViewpostUpdate(false);
        } catch (error) {
            console.error('שגיאה בעדכון הפריט', error);
        }
    };

    const ShowPost = (post) => {
        setSelectedPost(post);
        setShowPostInfo(true);
        // let post = { userId: user.id, id: post.id, title: post.title, body: post.body }
        // setUserPosts((prevUserPosts) => prevUserPosts.filter((post) => post.id !== post.id));
    }

    const PostsComments =async (id) => {
        console.log("gjb m,");
        setShowPostsComments(true);
        await fetch(`http://localhost:3000/comments?postId=${id}`)
        // await fetch(`http://localhost:3000/comments/1`)
        .then(response => response.json())
        .then(json => setPostsComments(json));
    }

    return (
        <>
            <h1>Posts</h1>
            <button onClick={() => { setShowPostsDetails(true) }}>Add Posts</button>
            {showPostsDetails && <form onSubmit={handleSubmit(AddPost)}>
                <input required placeholder='Write the title of post' id='' name='title'{...register("title")} ></input>
                <input required placeholder='Write the body of post' id='' name='body' {...register("body")}></input>
                <button type="submit">Ok</button>
            </form>}
            {viewpostUpdate && <form onSubmit={handleSubmit(UpdatePost)}>
                <input required placeholder='Write a new title of the post' id='' name='title' {...register("title")}></input>
                <input required placeholder='Write a new body of the post' id='' name='body' {...register("body")}></input>
                <button type="submit">Ok</button>
            </form>}
            {showPostInfo && selectedPost && (
                <div>
                    <p>{selectedPost.userId}</p>
                    <p>{selectedPost.id}</p>
                    <p>{selectedPost.title}</p>
                    <p>{selectedPost.body}</p>
                    <button onClick={()=>{PostsComments(selectedPost.id)}}>Comments</button>
                    {showPostsComments&&(postsComments.map(comment=>(
                        <li key={comment.id}>
                            Id: {comment.id} name: {comment.name} Email: {comment.email}
                        </li>
                    )))}
                </div>
            )}

            <ul>
                {userPosts.map(post => (
                    <li key={post.id}>
                        Id: {post.id} Title: {post.title}
                        <button onClick={() => { DeletePost(post) }}>Delete</button>
                        <button onClick={() => { { postId.current = post.id }; setViewpostUpdate(true) }}>Update</button>
                        <button onClick={() => { ShowPost(post) }}>Info</button>
                    </li>
                ))}

            </ul>
        </>
    );

}
export default Posts;