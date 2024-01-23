import React, { useRef, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { IoTrashOutline } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { BsInfoCircle } from "react-icons/bs";
const Posts = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [userPosts, setUserPosts] = useState([]);
    const [showPostsDetails, setShowPostsDetails] = useState(false);
    const [showPostInfo, setShowPostInfo] = useState(false);
    const [viewpostUpdate, setViewpostUpdate] = useState(false);
    const [nextId, setNextId] = useState();
    // const [post, setPost] = useState();

    const [selectedPost, setSelectedPost] = useState(null);

    const [showPostsComments, setShowPostsComments] = useState(false);
    const [postsComments, setPostsComments] = useState([]);
    const [showCommentDetails, setShowCommentDetails] = useState(false);
    const [showAAA, setShowAAA] = useState(false);

    const [showsearchBox, setShowsearchBox] = useState(false);
    const [allUserPosts, setAllUserPosts] = useState([]);
    const [] = useState(false);


    const { register, handleSubmit } = useForm();
    const postId = useRef(0);
    const commentId = useRef(0);
    const searchValue = useRef('');

    useEffect(() => {
        //users todo
        fetch(`http://localhost:3000/posts?userId=${user.id}`)
            .then(response => response.json())
            .then(json => {
                setUserPosts(json)
                setAllUserPosts(json);
            });

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


    const AddPost=  (data)=> {
        debugger
        console.log(userPosts)
         fetch("http://localhost:3000/nextIDs/3", 
        {
           method: 'PATCH',
           body: JSON.stringify({
               nextId:nextId+1,
           }),      headers: {
               'Content-type': 'application/json; charset=UTF-8',
           },
           });
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
            setAllUserPosts(prev => [...prev, newPost]);
            setShowPostsDetails(false);
            setNextId((prev) => prev + 1);
        }).catch((ex) => alert(ex));
      
        
        }
 
    


const DeletePost = async (post) => {
    const userConfirmed = window.confirm('Do you want to delete this post?');
    if (userConfirmed) {
        try {
            await fetch(`http://localhost:3000/posts/${post.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setUserPosts((prevUserPosts) => prevUserPosts.filter((item) => item.id !== post.id));
            setAllUserPosts((prevUserPosts) => prevUserPosts.filter((item) => item.id !== post.id));

        } catch (error) {
            console.error('שגיאה במחיקת הפוסט', error);
        }
    }
};
const DeleteComment = async (comment) => {
    const userConfirmed = window.confirm('Do you want to delete this comment?');
    if (userConfirmed) {
        try {
            await fetch(`http://localhost:3000/comments/${comment.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setPostsComments((prevPostsComments) => prevPostsComments.filter((item) => item.id !== comment.id));
        } catch (error) {
            console.error('שגיאה במחיקת הפוסט', error);
        }
    }

}

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
        setAllUserPosts((prevUserPosts) =>
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
const UpdateComment = async (data) => {
    try {
        await fetch(`http://localhost:3000/comments/${commentId.current}`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                body: data.body
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        setPostsComments((prevPostsComments) =>
            prevPostsComments.map((postsComments) =>
                postsComments.id === commentId.current
                    ? {
                        ...postsComments,
                        name: data.name,
                        body: data.body
                    }
                    : postsComments
            )
        );
        setShowAAA(!showAAA);
    } catch (error) {
        console.error('שגיאה בעדכון הפריט', error);
    }
}

const ShowPost = (post) => {
    setSelectedPost(post);
    setShowPostInfo(!showPostInfo);
    // let post = { userId: user.id, id: post.id, title: post.title, body: post.body }
    // setUserPosts((prevUserPosts) => prevUserPosts.filter((post) => post.id !== post.id));
}
const PostsComments = async (id) => {
    // console.log("gjb m,");
    setShowPostsComments(!showPostsComments);
    await fetch(`http://localhost:3000/comments?postId=${id}`)
        // await fetch(`http://localhost:3000/comments/1`)
        .then(response => response.json())
        .then(json => setPostsComments(json));
}


// const ShowAddComment=(post)=>{
//     setShowCommentDetails(true);
//     // localStorage.setItem('post', JSON.stringify(data[0]));
//     // const post = { userId: post.userId, id: post.id, title: post.title, body: post.body };
//     // localStorage.setItem('post', JSON.stringify(post));
// }

function AddComment(data) {
    
    // console.log(userPosts)
    fetch("http://localhost:3000/nextIDs/4", 
    {
       method: 'PATCH',
       body: JSON.stringify({
           nextId:nextId+1,
       }),      headers: {
           'Content-type': 'application/json; charset=UTF-8',
       },
       });
    console.log("Data:", data);
    // debugger
    if (data.email === user.email) {
        const newComment = { postId: postId.current, id: `${nextId}`, name: data.name, email: data.email, body: data.body }
        console.log(postId.current)
        fetch(`http://localhost:3000/comments?postId=${postId.current}`, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then(response => {
            if (!response.ok)
                throw 'Error' + response.status + ': ' + response.statusText;
            //return response.json();//????
        }).then(() => {
            setPostsComments(prev => [...prev, newComment])
            setShowCommentDetails(false);
            setNextId((prev) => prev + 1);
        }).catch((ex) => alert(ex));
    }
    else {
        alert("The email is incorrect!")
    }
};

const Search = (data) => {
    setShowsearchBox(false);

    let val = searchValue.current;
    if (val == 'All') {
        setUserPosts(allUserPosts)
    }
    else {
        let arr = allUserPosts;
        const filteredByValue = arr.filter(obj => {
            return obj[val] == data.valueToSearch;
        });
        console.log(filteredByValue);
        setUserPosts(filteredByValue);
    }
}

return (
    <>
        <h1>Posts</h1>
        <select defaultValue onChange={(e) => { (e.target.value !== 'All') ? setShowsearchBox(true) : null; searchValue.current = e.target.value }} >
            {/* onChange={SearchBy} */}
            <option value="All">Search</option>
            <option value="All">All</option>
            <option value="id">Id</option>
            <option value="title">Title</option>
        </select>
        <form onSubmit={handleSubmit(Search)}>
            {showsearchBox && <input placeholder='Write the value of search' id='' name='valueToSearch' {...register("valueToSearch")}></input>}
            <button type="submit">search</button></form>
        <button onClick={() => { setShowPostsDetails(true) }}>Add Posts</button>
        {showPostsDetails && <form onSubmit={handleSubmit(AddPost)}>
            <input required placeholder='Write the title of post' id='' name='title'{...register("title")} ></input>
            <input required placeholder='Write the body of post' id='' name='body' {...register("body")}></input>
            <button type="submit">OK</button>
        </form>}
        {viewpostUpdate && <form onSubmit={handleSubmit(UpdatePost)}>
            <input required placeholder='Write a new title of the post' id='' name='title' {...register("title")}></input>
            <input required placeholder='Write a new body of the post' id='' name='body' {...register("body")}></input>
            <button type="submit">OK</button>
        </form>}
        {showCommentDetails && <form onSubmit={handleSubmit(AddComment)}>
            <input required placeholder='name' id='' name='name' {...register("name")}></input>
            <input required placeholder='email' id='' name='email' {...register("email")}></input>
            <input required placeholder='body' id='' name='body' {...register("body")}></input>
            <button type="submit">Ok</button>
        </form>}

        {showPostInfo && selectedPost && (
            <div>
                <p>User Id: {selectedPost.userId}</p>
                <p>Post Id: {selectedPost.id}</p>
                <p>Title: {selectedPost.title}</p>
                <p>Body: {selectedPost.body}</p>
                <button onClick={() => { PostsComments(selectedPost.id) }}>Comments</button>
                {showAAA && <form onSubmit={handleSubmit(UpdateComment)}>
                    <input required placeholder='Write a new title of the comment' id='' name='name'{...register("name")} ></input>
                    <input required placeholder='Writea new body of the  comment' id='' name='body' {...register("body")}></input>
                    <button type="submit">Ok</button>
                </form>}
                {showCommentDetails && <form onSubmit={handleSubmit(AddComment)}>
                    <input required placeholder='name' id='' name='name' {...register("name")}></input>
                    <input required placeholder='email' id='' name='email' {...register("email")}></input>
                    <input required placeholder='body' id='' name='body' {...register("body")}></input>
                    <button type="submit">Ok</button>
                </form>}
                {showPostsComments && (postsComments.map(comment => (
                    <li key={comment.id}>
                        Id: {comment.id}<br />name: {comment.name}<br />Email: {comment.email}
                        {comment.email == user.email ? <><button onClick={() => { DeleteComment(comment) }}><IoTrashOutline /></button>
                            <button onClick={() => { commentId.current = comment.id; setShowAAA(!showAAA) }}><LuClipboardEdit /></button></> : null}
                    </li>
                )))}
            </div>
        )}
        <ul>
            {userPosts.map(post => (
                <li key={post.id}>
                    Id: {post.id} Title: {post.title}
                    <button onClick={() => { postId.current = post.id; setShowCommentDetails(!showCommentDetails) }}>Add comment</button>
                    <button onClick={() => { DeletePost(post) }}><IoTrashOutline /></button>
                    <button onClick={() => { postId.current = post.id; setViewpostUpdate(true) }}><LuClipboardEdit /></button>
                    <button onClick={() => { ShowPost(post) }}><BsInfoCircle /></button>
                </li>
            ))}
        </ul>
    </>
);
}

export default Posts;