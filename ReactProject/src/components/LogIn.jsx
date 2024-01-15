import React, {useEffect, useState } from 'react';

function LogIn(){

const CheckUser = (event)=>{
    event.preventDefault();
    // const [name,setname]=useState(null);
    // useEffect(()=>{alert(lgsfg)});
    // setname(username.value);
    const [username, userpassword] = event.target;
    let name = username.value;
    let password = userpassword.value;
    console.log(name+password) 
    // if(){
        // useEffect(()=>{
        //     fetch(`http://localhost:3000/users?name=${name}`)
        //     .then(alert(name));
        // })

    // }
    // else(לא נמצא){

    // }
 }

return(
<>
<h1>Log In</h1>
<form onSubmit={CheckUser}>
<input required type="text" placeholder="username" id="name" name=""/>
<input required type="text"  placeholder="password" id="pass" name=""/>
<button type="submit">Log In</button>
</form>
</>
)
}
export default LogIn;
