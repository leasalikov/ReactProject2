
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
        <form onSubmit={handleSubmit}>
            <label>
                id:
                <input type="text" name="id" value={formData.id} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                name:
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                username:
                <input type="password" name="username" value={formData.password} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                email:
                <input type="password" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                address:
                <input type="text" name="street" value={formData.address.street} onChange={handleInputChange} />
                <input type="text" name="suite" value={formData.address.suite} onChange={handleInputChange} />
                <input type="text" name="city" value={formData.address.city} onChange={handleInputChange} />
                <input type="text" name="zipcode" value={formData.address.zipcode} onChange={handleInputChange} />
            </label>
            <label>
            geo:
            <input type="text" name="lat" value={formData.address.geo.lat} onChange={handleInputChange} />
            <input type="text" name="lng" value={formData.address.geo.lng} onChange={handleInputChange} />
            </label>
            <br />
            <label>
            phone:
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
            </label>
            <br />
            <label>
            website:
                <input type="text" name="website" value={formData.website} onChange={handleInputChange} />
            </label>
            <br />
            <label>
            company:
            <input type="text" name="Name" value={formData.company.Name} onChange={handleInputChange} />
            <input type="text" name="catchPhrase" value={formData.company.catchPhrase} onChange={handleInputChange} />
            <input type="text" name="bs" value={formData.company.bs} onChange={handleInputChange} />
            </label>
            <button type="submit">Sent</button>
        </form >
    )
}
export default FillDetails;

