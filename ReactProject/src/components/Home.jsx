
import {Navigate, Outlet, useNavigate} from 'react-router-dom';
import React ,{ useEffect,useState}from 'react';
import Info from './Info';
import Todos from './Todos';
import Posts from './Posts';
import Albums from './Albums';


const Home = () => {
   const [info, setInfo]=useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        navigate('/LogIn')
    }
    const logOut=()=>{
        localStorage.removeItem("user");
        navigate('/LogIn');
    }
   
    return(
        <>
        <button onClick={()=>{setInfo(!info)}}>Info</button>
        <button onClick={()=>{navigate('todos')}}>Todos</button>
        <button onClick={()=>{navigate('posts')}}>Posts</button>
        <button onClick={()=>{navigate('albums')}}>Albums</button>
        <button onClick={logOut}>Logout</button>
        <h1>{user.username}</h1>  
        {info&&<Info />}
        <Outlet/>
        </>
    )

}
export default Home;