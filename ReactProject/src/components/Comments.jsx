import React, { useState, useEffect } from 'react';
import { useParams,useLocation  } from 'react-router-dom';

const Comments = () => {
    const location=useLocation();
    const { selectedPost,user} = location.state;
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // הפונקציה שתבצע טעינת הפוסט והתגובות בהתאם ל-id מה-URL
        const fetchPostAndComments = async () => {
            // קוד לטעינת הפוסט
            const postResponse = await fetch(`http://localhost:3000/posts/${id}`);
            const postData = await postResponse.json();
            setPost(postData);

            // קוד לטעינת התגובות
            const commentsResponse = await fetch(`http://localhost:3000/comments?postId=${id}`);
            const commentsData = await commentsResponse.json();
            setComments(commentsData);
        };

        fetchPostAndComments();
    }, [id]);

    return (
        <>
        <h>comments</h>
            {showCommentDetails && <form onSubmit={handleSubmit(AddComment)}>
                <input required placeholder='name' id='' name='name' {...register("name")}></input>
                <input required placeholder='email' id='' name='email' {...register("email")}></input>
                <input required placeholder='body' id='' name='body' {...register("body")}></input>
                <button type="submit">Ok</button>
            </form>}
            {showAAA && <form onSubmit={handleSubmit(UpdateComment)}>
                <input required placeholder='Write a new title of the comment' id='' name='name'{...register("name")} ></input>
                <input required placeholder='Writea new body of the  comment' id='' name='body' {...register("body")}></input>
                <button type="submit">Ok</button>
            </form>}
            {showPostsComments && (postsComments.map(comment => (
                <li key={comment.id}>
                    Id: {comment.id}<br />name: {comment.name}<br />Email: {comment.email}
                    {comment.email == user.email ? <><button onClick={() => { DeleteComment(comment) }}><IoTrashOutline /></button>
                        <button onClick={() => { commentId.current = comment.id; setShowAAA(!showAAA) }}><LuClipboardEdit /></button></> : null}
                </li>
            )))}
        </>
    );
}

export default Comments;

// import React, { useRef, useEffect, useState } from 'react';
// import { useLocation } from "react-router-dom";
// import { IoTrashOutline } from "react-icons/io5";
// import { LuClipboardEdit } from "react-icons/lu";
// import { useForm } from "react-hook-form";

// const Comments = () => {
//     const location = useLocation();
//     const { selectedPost, user } = location.state;
//     const commentId = useRef(0);
//     const [showAAA, setShowAAA] = useState(false);
//     const [showCommentDetails, setShowCommentDetails] = useState(false);
//     const [postsComments, setPostsComments] = useState([]);
//     const [showPostsComments, setShowPostsComments] = useState(false);
//     const [nextId, setNextId] = useState();
//     const { register, handleSubmit } = useForm();

//     useEffect(() => {
//         //users todo
//         fetch(`http://localhost:3000/comments?postId=${selectedPost}`)
//             .then(response => response.json())
//             .then(json => setPostsComments(json));
//         fetch("http://localhost:3000/nextIDs/4")
//             .then(response => {
//                 if (!response.ok)
//                     throw 'Error' + response.status + ': ' + response.statusText;
//                 return response.json();
//             })
//             .then((json) => {
//                 setNextId(json.nextId)
//             }).catch(ex => alert(ex));
//     }, [])

//     const UpdateId = () => {
//         fetch("http://localhost:3000/nextIDs/4",
//             {
//                 method: 'PATCH',
//                 body: JSON.stringify({
//                     nextId: nextId + 1,
//                 }), headers: {
//                     'Content-type': 'application/json; charset=UTF-8',
//                 },
//             });
//     }
//     const DeleteComment = async (comment) => {
//         const userConfirmed = window.confirm('Do you want to delete this comment?');
//         if (userConfirmed) {
//             try {
//                 await fetch(`http://localhost:3000/comments/${comment.id}`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 setPostsComments((prevPostsComments) => prevPostsComments.filter((item) => item.id !== comment.id));
//             } catch (error) {
//                 console.error('שגיאה במחיקת הפוסט', error);
//             }
//         }

//     }
    
//     const UpdateComment = async (data) => {
//         try {
//             await fetch(`http://localhost:3000/comments/${commentId.current}`, {
//                 method: 'PATCH',
//                 body: JSON.stringify({
//                     name: data.name,
//                     body: data.body
//                 }),
//                 headers: {
//                     'Content-type': 'application/json; charset=UTF-8',
//                 },
//             });
//             setPostsComments((prevPostsComments) =>
//                 prevPostsComments.map((postsComments) =>
//                     postsComments.id === commentId.current
//                         ? {
//                             ...postsComments,
//                             name: data.name,
//                             body: data.body
//                         }
//                         : postsComments
//                 )
//             );
//             setShowAAA(!showAAA);
//         } catch (error) {
//             console.error('שגיאה בעדכון הפריט', error);
//         }
//     }
//     const PostsComments = async (id) => {
//         setShowPostsComments(true);
//         await fetch(`http://localhost:3000/comments?postId=${id}`)
//             // await fetch(`http://localhost:3000/comments/1`)
//             .then(response => response.json())
//             .then(json => setPostsComments(json));
//     }
    function AddComment(data) {
        UpdateId();
        console.log("Data:", data);
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

//     return (
//         <>
//         <h>jhcn,jhjuymykbgjft</h>
//             {showCommentDetails && <form onSubmit={handleSubmit(AddComment)}>
//                 <input required placeholder='name' id='' name='name' {...register("name")}></input>
//                 <input required placeholder='email' id='' name='email' {...register("email")}></input>
//                 <input required placeholder='body' id='' name='body' {...register("body")}></input>
//                 <button type="submit">Ok</button>
//             </form>}
//             {showAAA && <form onSubmit={handleSubmit(UpdateComment)}>
//                 <input required placeholder='Write a new title of the comment' id='' name='name'{...register("name")} ></input>
//                 <input required placeholder='Writea new body of the  comment' id='' name='body' {...register("body")}></input>
//                 <button type="submit">Ok</button>
//             </form>}
//             {showCommentDetails && <form onSubmit={handleSubmit(AddComment)}>
//                 <input required placeholder='name' id='' name='name' {...register("name")}></input>
//                 <input required placeholder='email' id='' name='email' {...register("email")}></input>
//                 <input required placeholder='body' id='' name='body' {...register("body")}></input>
//                 <button type="submit">Ok</button>
//             </form>}
//             {showPostsComments && (postsComments.map(comment => (
//                 <li key={comment.id}>
//                     Id: {comment.id}<br />name: {comment.name}<br />Email: {comment.email}
//                     {comment.email == user.email ? <><button onClick={() => { DeleteComment(comment) }}><IoTrashOutline /></button>
//                         <button onClick={() => { commentId.current = comment.id; setShowAAA(!showAAA) }}><LuClipboardEdit /></button></> : null}
//                 </li>
//             )))}
//         </>
//     )
// }
// export default Comments


