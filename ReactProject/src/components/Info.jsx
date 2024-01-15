import React from "react";
// import Home from "./Home";

const Info=(prop)=>{

    const {user} = prop;
    console.log(user[0].name)
    // const ShowInfo=()=>{
        
    // }
return(
<p>{`name: ${user[0].name}`}</p>
)
}
export default Info;