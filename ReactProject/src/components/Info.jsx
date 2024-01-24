import React, { useEffect, useState } from "react";
// import Home from "./Home";

const Info = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            <p> <b>id: </b>{user.id}<br />
                <b>name: </b>{user.name}<br />
                <b>email: </b>{user.email}<br />
                <b>address: </b><br />
                <b>street: </b>{user.address.street}<br />
                <b>suite: </b>{user.address.suite}<br />
                <b>city: </b>{user.address.city}<br />
                <b>zipcode: </b>{user.address.zipcode}<br />
                <b>geo: </b><br />
                <b>lat: </b>{user.address.geo.lat}<br />
                <b>lng: </b>{user.address.geo.lng}<br />
                <b>phone: </b>{user.phone}<br />
                <b>email: </b>{user.email}<br />
                <b>company </b><br />
                <b>Name: </b>{user.company.Name}<br />
                <b>catchPhrase: </b>{user.company.catchPhrase}<br />
                <b>bs: </b>{user.company.bs}</p>
        </>
    )
}
export default Info;
