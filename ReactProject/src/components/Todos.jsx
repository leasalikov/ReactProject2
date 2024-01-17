import React ,{ useEffect, useState}from 'react';
import { useParams } from "react-router-dom";
const Todos= ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const [data,setData]=useState([]);
    const [isChecked,setIsChecked]=useState(false);

    useEffect(() => {
        //  fetch(`http://localhost:3000/todos?userid=${user.id}`)
         fetch(`http://localhost:3000/todos?userId=1`)
        .then(respons=>respons.json())
        .then(json=>{setData(json)});
        
    },[]);
    const todos=localStorage.setItem('userTodos', JSON.stringify(data));


    const SortBySerial=(event)=>{
      event.preventDefault();
      console.log(event.value)
      event.value;
      const strAscending = [...todos].sort((a, b) =>
      a.id > b.id ? 1 : -1,
      );
      console.log(strAscending)
    }


    // console.log(data[0]);
    // const handleChange=(event)=>{
    //   setIsChecked(prev=>!prev);
    //   event.completed=!isChecked;
    //   onChange={handleChange} 
    //   console.log(event.completed,isChecked);
    // }
    return(
    <>
      <h1>Todos</h1>
      <select>
      <option value="" disabled selected hidden onChange={SortBySerial} >Select Option</option>
        <option value="Serial" onChange={SortBySerial}>Serial</option>
        <option value="Complete">Complete</option>
        <option value="Alphabetical">Alphabetical</option>
        <option value="Random">Random</option>

      </select>
      <div>
      <ul>
        {data.map(item=> (
        <li key={item.id} ><input type="checkbox" checked = {item.completed ? true : false } />Id: {item.id} Titel: {item.title}</li>
        )) }


      </ul>
      </div>
    </>
);
}
export default Todos;
