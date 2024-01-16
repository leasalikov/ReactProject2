
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const FillDetails = () => {


    const [formData, setFormData] = useState({
        id: '',
        name: '',
        username: '',
        email: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: ''
            }
        },
        phone: '',
        website: '',
        company: {
            Name: '',
            catchPhrase: '',
            bs: ''
        }
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // כאן תוכל להשתמש בנתונים מהטופס שנשמרו בסטייט
        console.log('Details:', formData);
    };
    // const send = () => {
    //     event.preventDefault();
    //     // כאן תוכל להשתמש בנתונים מהטופס שנשמרו בסטייט
    //     console.log('Details:', formData);
    // };


    return (
        <form onSubmit={handleSubmit} >
            <label>
                id:
                <input required type="text" name="id" value={formData.id} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                name:
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                username:
                <input required type="password" name="username" value={formData.password} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                email:
                <input required type="password" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                address:
                <input required type="text" name="street" value={formData.address.street} placeholder='street' onChange={handleInputChange} />
                <input required type="text" name="suite" value={formData.address.suite} placeholder='suite' onChange={handleInputChange} />
                <input required type="text" name="city" value={formData.address.city} placeholder='city' onChange={handleInputChange} />
                <input required type="text" name="zipcode" value={formData.address.zipcode} placeholder='zipcode' onChange={handleInputChange} />
            </label>
            <label>
            geo:
            <input required type="text" name="lat" value={formData.address.geo.lat} placeholder='lat' onChange={handleInputChange} />
            <input required type="text" name="lng" value={formData.address.geo.lng} placeholder='lng' onChange={handleInputChange} />
            </label>
            <br />
            <label>
            phone:
                <input required type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
            </label>
            <br />
            <label>
            website:
                <input required type="text" name="website" value={formData.website} onChange={handleInputChange} />
            </label>
            <br />
            <label>
            company:
            <input required type="text" name="Name" value={formData.company.Name} placeholder='Name' onChange={handleInputChange} />
            <input required type="text" name="catchPhrase" value={formData.company.catchPhrase} placeholder='catchPhrase' onChange={handleInputChange} />
            <input required type="text" name="bs" value={formData.company.bs} placeholder='bs' onChange={handleInputChange} />
            </label>
            <button type="submit">Sent</button>
        </form >
    )
}
export default FillDetails;

