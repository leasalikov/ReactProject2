import {Navigate, useNavigate} from 'react-router-dom';
import React ,{useState}from 'react';

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '' , verifyPassword:'' });
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        username:'',
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

    const CheckPeople = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users?username=${user.username}`);
            const data = await response.json();
            if (!(data.length === 0))
                alert("User already exist!");
            else
            {
                setShowDetails(true);
                setFormData({
                    ...formData,
                    username: user.username,
                    website: user.password
                });}
        } catch (error) {
            console.error('ERROR:', error);
        }
    };
    const CheckPassword = (event)=>{
        event.preventDefault();
        if(user.password===user.verifyPassword)
            CheckPeople();
        else{
        alert("The password is incorrect!")
        }
    }


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
        console.log('Details:', formData);
        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((navigate('/Home')));
    };

    return (
        <>
            <h1>Sing Up</h1>
        { !showDetails&&<form onSubmit={CheckPassword}>
                <input required type="text" placeholder="username" id="name" name="" onChange={(e) => setUser({ username: e.target.value, password: '' })} />
                <input required type="password" placeholder="password" id="password" name=""  onChange={(e) =>setUser({ username: user.username, password: e.target.value })} />
                <input required type="password" placeholder="verify-password" id="verify-password" name="" onChange={(e) =>setUser({ username: user.username, password: user.password, verifyPassword: e.target.value })}/>
            <button type="submit">Ok</button>
            </form>}
            {showDetails&&<form onSubmit={handleSubmit} >
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
        </form >}

        </>
    )
}
export default Register;