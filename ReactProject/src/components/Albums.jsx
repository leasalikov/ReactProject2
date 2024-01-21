import React, { useRef, useEffect, useState } from 'react';
// import { useForm } from "react-hook-form";


const Albums = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [userAlbums, setUserAlbums] = useState([]);


    useEffect(() => {
        //users Albums
        fetch(`http://localhost:3000/albums?userId=${user.id}`)
            .then(response => response.json())
            .then(json => {
                setUserAlbums(json.map(j => { return { ...j, display: false } }));
            });
            console.log({userAlbums})

    }, []);


    return (
        <>
            <h1>Albums</h1>
            <ul>
                {userAlbums.map(item => (
                    <li key={item.id}>
                        Id: {item.id} Title: {item.title}
                        {/* <a href={`#http://localhost:3000/photos/${album.id}`}>Id: {item.id} Title: {item.title}</a> */}

                    </li>
                ))}

            </ul>
        </>
    )
}
export default Albums;