import {Navigate, useNavigate} from 'react-router-dom';
import React ,{useState}from 'react';

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '' , verifyPassword:'' });
    const navigate = useNavigate();

    const CheckPeople = async (event) => {
        event.preventDefault();
        CheckPassword();
        try {
            const response = await fetch(`http://localhost:3000/users?username=${user.username}`);
            const data = await response.json();
            if (!(data.length === 0))
                alert("User already exist!");
            else {               
                localStorage.setItem('user', JSON.stringify(data));
            }

        } catch (error) {
            console.error('ERROR:', error);
        }
    };
    const CheckPassword = ()=>{
        if(user.password===user.verifyPassword)
            navigate('/FillDetails');
        else{
            alert("The password is incorrect!")
        }
    }

    return (
        <>
            <h1>Sing Up</h1>
            <form onSubmit={CheckPeople}>
                <input required type="text" placeholder="username" id="name" name="" onChange={(e) => setUser({ username: e.target.value, password: '' })} />
                <input required type="password" placeholder="password" id="password" name=""  onChange={(e) =>setUser({ username: user.username, password: e.target.value })} />
                <input required type="password" placeholder="verify-password" id="verify-password" name="" onChange={(e) =>setUser({ username: user.username, password: user.password, verifyPassword: e.target.value })}/>
            <button type="submit">Ok</button>
            </form>


        </>
    )
}
export default Register;