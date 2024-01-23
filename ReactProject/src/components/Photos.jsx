import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Photos = () => {
    const location = useLocation();
    const { album } = location.state;
    const { id } = useParams();
    const [albumsPhotos, setAlbumsPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [indexPhotos, setIndexPhotos] = useState({ start: 0, end: 7 })
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
    // useEffect(() => {
    //         handleNextPage();
    // }, []);
    console.log(albumsPhotos)
    const handleNextPage = () => {
        setIndexPhotos({ start: indexPhotos.start + 7, end: indexPhotos.end + 7 })
        ShowPhotos();
    };

    const startIndex = (currentPage - 1) * photosPerPage;
    const endIndex = Math.min(startIndex + photosPerPage, albumsPhotos.length);

    return (
        <>
            <h1>Photos</h1>
            <p><b>Album: </b> {album.title}</p>

            {/* <button onClick={() => { setShowTitleInput(!showTitleInput) }}>Add Album</button>
{showTitleInput && <form onSubmit={handleSubmit(AddAlbum)}>
    <input required placeholder='Title of new album' id='' name='title' {...register("title")}></input>
    <button type="submit">Ok</button>
</form>} */}
            <ul>

                {albumsPhotos.map(photo => (
                    <li key={photo.id}>
                        <b>Title: </b>{photo.title}<br />
                        <img src={photo.thumbnailUrl} alt={`Image ${photo.id}`} />
                        <button onClick={() => { DeletePhoto(photo) }}><IoTrashOutline /></button>
                        <button onClick={() => { albumId.current = photo.id; setViewpostUpdate(true) }}><LuClipboardEdit /></button>
                    </li>
                ))}
            </ul>
            <button onClick={handleNextPage} >Next</button>
        </>
    );
};

export default Photos;
