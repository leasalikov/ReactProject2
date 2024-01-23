import React,{useEffect, useState} from "react";
// import Home from "./Home";

const Info=()=>{
//     const [user,setUser]=useState()
// useEffect(()=>{
//     setUser(JSON.parse(localStorage.getItem('user'))) ;
// },[]);
// console.log(user);
const user = JSON.parse(localStorage.getItem('user'));
    //אולי צריך לעשות map
return(
    <>
<p> id: {user.id}<br />
    name: {user.name}<br />
    email: {user.email}<br />
    address: <br />
    street: {user.address.street}<br />
    suite: {user.address.suite}<br />
    city: {user.address.city}<br />
    ipcode: {user.zipcode}<br />
    geo: <br />
    lat: {user.address.geo.lat}<br />
    lng: {user.address.geo.lng} 
    phone: {user.phone}<br />
    email: {user.email}<br />
    company<br/>
    Name: {user.company.Name}<br />
    catchPhrase: {user.company.catchPhrase}<br />
    bs: {user.company.bs}</p>
    </> 
)
}
export default Info;
