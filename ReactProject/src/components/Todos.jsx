import React ,{ useEffect,useState}from 'react';
const Todos= ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const [data,setData]=useState();
    // useEffect(()=>{
    //     //  fetch(`http://localhost:3000/todos?userid=${user.id}`)
    //      fetch(`http://localhost:3000/todos/1`)
    //     .then(respons=>respons.json())
    //     .then(json=>{setData(json)})
    //     // .then(console.log(data))

    // },[])


    return(
    <>
      <p>Todos</p>
    </>
)
}
export default Todos;


///<ul>
//{/* {data.map(item=> (<li key={item.id}>{item.name}</li>))} */}
///</ul>