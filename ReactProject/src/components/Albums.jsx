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
    const [showTitleInput, setShowTitleInput] = useState(false);
    const [nextId, setNextId] = useState();

    const { register, handleSubmit } = useForm();

    useEffect(() => {
   
        fetch(`http://localhost:3000/albums?userId=${user.id}`)
            .then(response => response.json())
            .then(json => {
                setUserAlbums(json);
                setAllUserAlbums(json);
            })
            .catch(ex => alert(ex)); 
            fetch("http://localhost:3000/nextIDs/5")
            .then(response => {
                if (!response.ok)
                    throw 'Error' + response.status + ': ' + response.statusText;
                return response.json();
            })
            .then((json) => {
                setNextId(json.nextId)
            }).catch(ex => alert(ex));  
    },[]);

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
            if (filteredByValue.length === 0) {
                alert("There is no argument with this value")
                return;
            }
            setUserAlbums(filteredByValue);
        }
    };

    function AddAlbum(data) {
        console.log(userAlbums)
        fetch("http://localhost:3000/nextIDs/5", 
        {
           method: 'PATCH',
           body: JSON.stringify({
               nextId:nextId+1,
           }),      headers: {
               'Content-type': 'application/json; charset=UTF-8',
           },
           });
        const newAlbum = { userId: user.id, id: `${nextId}`, title: data.title }
        fetch('http://localhost:3000/albums', {
            method: 'POST',
            body: JSON.stringify(newAlbum),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then(response => {
            if (!response.ok)
                throw 'Error' + response.status + ': ' + response.statusText;
        }).then(() => {
            setUserAlbums(prev => [...prev, newAlbum])
            setAllUserAlbums(prev => [...prev, newAlbum]);
            setNextId((prev) => prev + 1);
        }).catch((ex) => alert(ex));
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
                    <div key={item.id}>
                        <Link to={`${item.id}/Photos`} state={{ album: item }}>
                            Id: {item.id} Title: {item.title}
                        </Link><br />
                    </div>
                ))}
            </ul>
            <button onClick={() => { setShowTitleInput(!showTitleInput) }}>Add Album</button>
            {showTitleInput && <form onSubmit={handleSubmit(AddAlbum)}>
                <input required placeholder='Title of new album' id='' name='title' {...register("title")}></input>
                <button type="submit">Ok</button>
            </form>}

        </>
    )
}

export default Albums;