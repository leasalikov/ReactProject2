import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function LogIn() {
    // debugger;
  const [user, setUser] = useState({name:'', password:''});
  const navigate = useNavigate();

  const CheckUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users?name=${user.name}&website=${user.password}`);
      const data = await response.json();

      if(data.length===0)
      alert("User does not exist!");
      else{
       
        localStorage.setItem('data', JSON.stringify(data));
        navigate("/Home");
      }

    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={CheckUser}>
        <input required type="text" placeholder="username" id="name" name="" onChange={(e) => setUser({name:e.target.value, password:''})} />
        <input required type="password" placeholder="password" id="password" name="" onChange={(e) => setUser({name:user.name, password:e.target.value})}/>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LogIn;