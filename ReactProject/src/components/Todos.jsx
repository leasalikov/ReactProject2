import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
const Todos = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [showTodoDetails, setShowTodoDetails] = useState(false);
  const [todo, setTodo] = useState({ userId: '', id: '' , title:'' ,completed:false});

  useEffect(() => {
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(response => response.json())
      .then(json => {
        setData(json);
        localStorage.setItem('userTodos', JSON.stringify(json));
      });
  }, []);


  const SortBySerial = () => {
    const strAscending = [...data].sort((a, b) =>
      a.id - b.id,
    );
    setData(strAscending);
  }

  const SortByComplete = () => {
    const strAscending = [...data].sort((a, b) =>
      b.completed - a.completed,
    );
    setData(strAscending);
  }

  const SortByAlphabetical = () => {
    const strAscending = [...data].sort((a, b) =>
      b.title > a.title ? -1 : 1,
    );
    setData(strAscending);
  }

  const SortByRandom = () => {
    const strAscending = [...data].sort((a, b) =>
      Math.random() - 0.5
    );
    setData(strAscending);
  }

  const SortByOptions = (event) => {

    switch (event.target.value) {
      case 'Serial':
        SortBySerial();
        break;
      case 'Complete':
        SortByComplete();
        break;
      case 'Alphabetical':
        SortByAlphabetical();
        break;
      case 'Random':
        SortByRandom();
        break;
    }
  }

  const DeleteTodo = async (item) => {
    alert('Do you want to delete this todo?')
    try {
      await fetch(`http://localhost:3000/todos/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData((prevData) => prevData.filter((todo) => todo.id !== item.id));
    } catch (error) {
      console.error('שגיאה במחיקת הפריט', error);
    }
  };

  const UpdateTodo = async(item) => {

  }

  const AddTodo = async() => {
// let id=?????
  //   try {
  //     const response = await fetch(`http://localhost:3000/todos?title=${user.username}`);
  //     const data = await response.json();
  //     if (!(data.length === 0))
  //         alert("User already exist!");
  //     else
  //     {
  //         setShowDetails(true);
  //         setFormData({
  //             ...formData,
  //             username: user.username,
  //             website: user.password
  //         });}
  // } catch (error) {
  //     console.error('ERROR:', error);
  // }
  }

  console.log(data);

  const handleChange = (item) => {
    item.completed = !item.completed;
    setIsChecked(prev => !prev);
    console.log(item.completed);
  }
  return (
    <>
      <h1>Todos</h1>
      <select defaultValue onChange={SortByOptions}>
        <option value="">Select Option</option>
        <option value="Serial">Serial</option>
        <option value="Complete">Complete</option>
        <option value="Alphabetical">Alphabetical</option>
        <option value="Random">Random</option>
      </select>
      <br/>
      <button onClick={()=>{setShowTodoDetails(true)}}>Add Todo</button>
      {showTodoDetails&&<form onSubmit={AddTodo}>
        <input required placeholder='Write the title of todo' id='' name='' onChange={(e) => setTodo({ userId:'' , id: '' , title: e.target.value ,completed:false})}></input>
        <button type="submit">Ok</button>
        </form>}
      <div>
        <ul>
          {data.map(item => (
            <li key={item.id}>
              <input type="checkbox" checked={item.completed} onChange={() => handleChange(item)} />
              Id: {item.id} Titel: {item.title}
              <button onClick={() => DeleteTodo(item)}>Delete</button>
              <button onClick={() => UpdateTodo(item)}>Update</button>
            </li>
          ))}

        </ul>
      </div>
    </>
  );
}
export default Todos;
