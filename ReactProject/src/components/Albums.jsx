import React, { useRef, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

const Albums = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [userAlbums, setUserAlbums] = useState([]);
    const [showsearchBox, setShowsearchBox] = useState(false);
    const [allUserAlbums, setAllUserAlbums] = useState([]);
    const searchValue = useRef('');
    const navigate = useNavigate();
    // const location = useLocation();
    // const {album} = location;


    useEffect(() => {
        // Fetch user albums
        fetch(`http://localhost:3000/albums?userId=${user.id}`)
            .then(response => response.json())
            .then(json => {
                setUserAlbums(json.map(j => { return { ...j, display: false } }));
                setAllUserAlbums(json);
            });
    }, []);

    const { register, handleSubmit } = useForm();

    const Search = (data) => {
        setShowsearchBox(false);
        let val = searchValue.current;

        if (val === 'All') {
            setUserAlbums(allUserAlbums);
        } else {
            let arr = allUserAlbums;
            const filteredByValue = arr.filter(obj => {
                return obj[val] == data.valueToSearch;
            });
            setUserAlbums(filteredByValue);
        }
    };

    return (
        <>
            <h1>Albums</h1>
            <select defaultValue onChange={(e) => { (e.target.value !== 'All') ? setShowsearchBox(true) : null; searchValue.current = e.target.value }} >
                <option value="All">Search</option>
                <option value="All">All</option>
                <option value="id">Id</option>
                <option value="title">Title</option>
            </select>
            <form onSubmit={handleSubmit(Search)}>
                {showsearchBox && <input placeholder='Write the value of search' id='' name='valueToSearch' {...register("valueToSearch")}></input>}
                <button type="submit">Search</button>
            </form>
            <ul>
                {userAlbums.map(item => (
                    // <a key={item.id} >
                    <div key={item.id}>
                        {/* {"/onboarding/profile" state={{ from: "occupation" }}} */}
                        <Link to={`${item.id}/Photos`} state={{ album: item  }}>
                            Id: {item.id} Title: {item.title}
                        </Link><br/>
                    </div>
                ))}
            </ul>

        </>
    )
}

export default Albums;
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Albums = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const [userAlbums, setUserAlbums] = useState([]);
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         fetch(`http://localhost:3000/albums?userId=${user.id}`)
//             .then(response => response.json())
//             .then(json => {
//                 setUserAlbums(json);
//             });
//     }, [user.id]);

//     const handleAlbumClick = (albumId) => {
//         navigate(`/Home/Albums/${albumId}/Photos`);
//     };

//     return (
//         <>
//             <h1>Albums</h1>
//             <ul>
//                 {userAlbums.map(item => (
//                     <a key={item.id} onClick={() => handleAlbumClick(item.id)}>
//                         Id: {item.id} Title: {item.title}
//                     </a>
//                 ))}
//             </ul>
//         </>
//     );
// };

// export default Albums;