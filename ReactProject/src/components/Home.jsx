
import {Navigate, useNavigate} from 'react-router-dom';
import React ,{useState}from 'react';
import Info from './Info';


const Home = () => {
    const [info,setInfo]=useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        return <Navigate to="/LogIn" />
    }

    return(
        <>
        <button onClick={()=>{setInfo(true)}}>Info</button>
        <button>Todos</button>
        <button>Posts</button>
        <button>Albums</button>
        <button>Logout</button>
        {/* <h1>{user[0].name}</h1>   */}
        {info&&<Info user={user}/>}
        </>
    )

}
export default Home;