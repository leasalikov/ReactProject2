import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { IoTrashOutline } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { useForm } from "react-hook-form";

const Photos = () => {
    const location = useLocation();
    const { album } = location.state;
    const { id } = useParams();
    const [albumsPhotos, setAlbumsPhotos] = useState([]);
    const [AllAlbumsPhotos, setAllAlbumsPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [indexPhotos, setIndexPhotos] = useState({ start: 0, end: 7 });
    const photoIdRef = useRef();
    const [viewPhotoUpdate, setViewPhotoUpdate] = useState(false);
    const [showPhotoDetails, setShowPhotoDetails] = useState(false);
    const [nextId, setNextId] = useState();
    const [loadedOnce, setLoadedOnce] = useState(false);
    const { register, handleSubmit } = useForm();

    const photosPerPage = 3;

    const ShowPhotos = async () => {
        await fetch(`http://localhost:3000/photos/?albumId=${album.id}&&_start=${indexPhotos.start}&&_end=${indexPhotos.end}`)
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(json => {
                setAlbumsPhotos(prev => [...prev, ...json]);
                // console.log(albumsPhotos)
            });
    }
    const ShowPhotosFirst = async () => {

        await fetch(`http://localhost:3000/photos/?albumId=${album.id}&&_limit=${photosPerPage}`)
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(json => {
                setAlbumsPhotos(prev => [...prev, ...json]);
                // console.log(albumsPhotos)
            });
        setLoadedOnce(true);
    }

    // useEffect(() => {
    //         handleNextPage();
    // }, []);

    useEffect(() => {
        if (!loadedOnce) {
            // טעינה ראשונית - הצג 7 תמונות
            ShowPhotosFirst();
            setLoadedOnce(true);
        }
    }, []);


    useEffect(() => {
        // fetch(`http://localhost:3000/photos?albumId=${album.id}`)
        //     .then(response => response.json())
        //     .then(json => {
        //         setAlbumsPhotos(json)
        //         setAllAlbumsPhotos(json);
        //     });

        fetch("http://localhost:3000/nextIDs/6")
            .then(response => {
                if (!response.ok)
                    throw 'Error' + response.status + ': ' + response.statusText;
                return response.json();
            })
            .then((json) => {
                setNextId(json.nextId)
            }).catch(ex => alert(ex));
    }, [])
    console.log(albumsPhotos)

    const handleNextPage = () => {
        setIndexPhotos({ start: indexPhotos.start + 7, end: indexPhotos.end + 7 })
        ShowPhotos();
        setLoadedOnce(true);
    };

    const startIndex = (currentPage - 1) * photosPerPage;
    const endIndex = Math.min(startIndex + photosPerPage, albumsPhotos.length);

    const UpdatePhoto = async (data) => {
        console.log(photoIdRef.current)
        try {
            await fetch(`http://localhost:3000/photos/${photoIdRef.current}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: data.title,
                    // body: data.body
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            setAlbumsPhotos((prevAlbumsPhotos) =>
                prevAlbumsPhotos.map((albumsPhoto) =>
                    albumsPhoto.id === photoIdRef.current
                        ? {
                            ...albumsPhoto,
                            title: data.title
                        }
                        : albumsPhoto
                )
            );
            setAllAlbumsPhotos((prevAlbumsPhotos) =>
                prevAlbumsPhotos.map((albumsPhoto) =>
                    albumsPhoto.id === photoIdRef.current
                        ? {
                            ...albumsPhoto,
                            title: data.title
                        }
                        : albumsPhoto
                )
            );
            setViewPhotoUpdate(false);
        } catch (error) {
            console.error('שגיאה בעדכון הפריט', error);
        }
    };

    const DeletePhoto = async (photo) => {
        const userConfirmed = window.confirm('Do you want to delete this photo?');
        if (userConfirmed) {
            try {
                await fetch(`http://localhost:3000/photos/${photo.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setAlbumsPhotos((prevAlbumsPhotos) => prevAlbumsPhotos.filter((item) => item.id !== photo.id));
                setAllAlbumsPhotos((prevAlbumsPhotos) => prevAlbumsPhotos.filter((item) => item.id !== photo.id));

            } catch (error) {
                console.error('שגיאה במחיקת הפוסט', error);
            }
        }
    };

    const AddPhoto = async (data) => {
        // console.log(userAlbums)
        setShowPhotoDetails(false)
        const response = await fetch("http://localhost:3000/nextIDs/6", {
            method: 'PATCH',
            body: JSON.stringify({
                nextId: nextId + 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const newPhoto = { albumId: album.id, id: `${nextId}`, title: data.title, url: data.url, thumbnailUrl: data.thumbnailUrl }
        fetch('http://localhost:3000/photos', {
            method: 'POST',
            body: JSON.stringify(newPhoto),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }).then(response => {
            if (!response.ok)
                throw 'Error' + response.status + ': ' + response.statusText;
            //return response.json();//???????????????????????
        }).then(() => {
            setAlbumsPhotos(prev => [...prev, newPhoto])
            setAllAlbumsPhotos(prev => [...prev, newPhoto]);
            setNextId((prev) => prev + 1);
        }).catch((ex) => alert(ex));
    };

    return (
        <>
            <h1>Photos</h1>
            <p><b>Album: </b> {album.title}</p>

            <button onClick={() => { setShowPhotoDetails(!showPhotoDetails) }}>Add Photo</button>
            {showPhotoDetails && <form onSubmit={handleSubmit(AddPhoto)}>
                <input required placeholder='Title' id='' name='title' {...register("title")}></input>
                <input required placeholder='url' id='' name='url' {...register("url")}></input>
                <input required placeholder='thumbnailUrl' id='' name='thumbnailUrl' {...register("thumbnailUrl")}></input>
                <button type="submit">Ok</button>
            </form>}

            {viewPhotoUpdate && <form onSubmit={handleSubmit(UpdatePhoto)}>
                <input required placeholder='Write a new title of the photo' id='' name='title' {...register("title")}></input>
                <button type="submit">OK</button>
            </form>}
            <ul>
                {albumsPhotos.map(photo => (
                    <li key={photo.id}>
                        <b>Title: </b>{photo.title}<br />
                        <img src={photo.thumbnailUrl} alt={`Image ${photo.id}`} />
                        <button onClick={() => { DeletePhoto(photo) }}><IoTrashOutline /></button>
                        <button onClick={() => { photoIdRef.current = photo.id; setViewPhotoUpdate(true) }}><LuClipboardEdit /></button>
                    </li>
                ))}
            </ul>
            <button onClick={handleNextPage} >Next</button>
        </>
    );
};

export default Photos;