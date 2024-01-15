import React from "react";
import { useState } from 'react';

function LogIn(){
// const User = {name, password};
let User={Name, password};
 const CheckUser = (event)=>{
    console.log("2");
    event.preventDefault();
    // const [username, password]=event.target;
    // debugger;
     console.log(username+"1"+password+"2");

 }

return(
<>
<h1>Log In</h1>
<form>
<input required type="text" placeholder="username" id="name" name=""/>
<input required type="text"  placeholder="password" id="pass" name=""/>
<button onClick={CheckUser(pass)}>Log In</button>
</form>
</>
)
}
export default LogIn;
