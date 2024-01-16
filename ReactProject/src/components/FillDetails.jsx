
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const FillDetails = () => {
    // const user=props;
    const user = JSON.parse(localStorage.getItem('user'));
// console.log(user.username);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        username: user.username,
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
        website: user.password,
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

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            address: { ...formData.address, [name]: value }
        });
    };

    const handleGeoChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                geo: { ...formData.address.geo, [name]: value }
            }
        });
    };

    const handleCompanyChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            company: { ...formData.company, [name]: value }
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("user", JSON.stringify(formData));
        // כאן תוכל להשתמש בנתונים מהטופס שנשמרו בסטייט
        console.log('Details:', formData);
    };

    return (
        <form onSubmit={handleSubmit} >
            <label>
                id:
                <input required type="number" name="id" value={formData.id} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                name:
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                email:
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <br />
            <label >
                address:
                <input type="text" name="street" value={formData.address.street} placeholder='street' onChange={handleAddressChange} />
                <input type="text" name="suite" value={formData.address.suite} placeholder='suite' onChange={handleAddressChange} />
                <input type="text" name="city" value={formData.address.city} placeholder='city' onChange={handleAddressChange} />
                <input type="tel" name="zipcode" value={formData.address.zipcode} placeholder='zipcode' onChange={handleAddressChange} />
                <label>
                <br />
                    geo:
                    <input type="number" name="lat" value={formData.address.geo.lat} placeholder='lat' onChange={handleGeoChange} />
                    <input type="number" name="lng" value={formData.address.geo.lng} placeholder='lng' onChange={handleGeoChange} />
                </label>
            </label>
            <br />
            <label>
                phone:
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                company:
                <input type="text" name="Name" value={formData.company.Name} placeholder='Name' onChange={handleCompanyChange} />
                <input type="text" name="catchPhrase" value={formData.company.catchPhrase} placeholder='catchPhrase' onChange={handleCompanyChange} />
                <input type="text" name="bs" value={formData.company.bs} placeholder='bs' onChange={handleCompanyChange} />
            </label>
            <br />
            <button type="submit">Sent</button>
        </form >
    )
}
export default FillDetails;

