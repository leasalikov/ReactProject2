import React ,{ useEffect, useState}from 'react';
import { useParams } from "react-router-dom";
const Todos= ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const [data,setData]=useState([{}]);
    const [isChecked,setIsChecked]=useState(false);

    useEffect(() => {
        //  fetch(`http://localhost:3000/todos?userid=${user.id}`)
         fetch(`http://localhost:3000/todos?userId=1`)
        .then(respons=>respons.json())
        .then(json=>{setData(json)});

    },[]);

    console.log(data[0]);
    const handleChange=()=>{
      item.completed=true;
    }
  //   const CheckPeople = async () => {
  //     try {
  //         const response = await fetch(`http://localhost:3000/users?username=${user.username}`);
  //         const data = await response.json();
  //         if (!(data.length === 0))
  //             alert("User already exist!");
  //         else
  //         {
  //             setShowDetails(true);
  //             setFormData({
  //                 ...formData,
  //                 username: user.username,
  //                 website: user.password
  //             });}
  //     } catch (error) {
  //         console.error('ERROR:', error);
  //     }
  // };
    return(
    <>
      <p>Todos<br/>{data.userId}</p>
      {/* <div>
            {data.map((element, index) => {
                      return <span key={index}>{element.userId}</span>
                  })}
      </div> */}
      <div>
      <ul>
        {data.map(item=> (
        <li key={item.id}><input type="checkbox" checked={ item.completed ? true : false } onChange={{handleChange}}/><label>Id: {item.id} Titel: {item.title}</label></li>
        )) }
      </ul>
      </div>
    </>
);
}
export default Todos;


///<ul>
//{/* {data.map(item=> (<li key={item.id}>{item.name}</li>))} */}
///</ul>