import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

const Photos = () => {
    const location = useLocation();
    const {album}=location.state;
    const { id } = useParams();


    return (
        <>
            <h1>Photos</h1>
            <p>Album ID: {id}</p>
            {/* כאן תציג את התמונות או תיבת טקסט אחרת */}
        </>
    );
};

export default Photos;