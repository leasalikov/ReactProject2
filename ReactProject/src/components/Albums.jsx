import React, { useRef, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const Albums = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [userAlbums, setUserAlbums] = useState([]);
    const [showsearchBox, setShowsearchBox] = useState(false);
    const [allUserAlbums, setAllUserAlbums] = useState([]);
    const searchValue = useRef('');

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
                    <a key={item.id} onClick={()=>{navigate('/Photos')}}>
                        Id: {item.id} Title: {item.title}
                    </a>

                ))}
            </ul>
        </>
    )
}

export default Albums;