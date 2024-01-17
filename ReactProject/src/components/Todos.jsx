import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
const Todos = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [data, setData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    //  fetch(`http://localhost:3000/todos?userid=${user.id}`)
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(respons => respons.json())
      .then(json => { setData(json) });

  }, []);
  localStorage.setItem('userTodos', JSON.stringify(data));


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

  const DeleteTodo = (item) => {
    fetch(`http://localhost:3000/todos?id=${item.id}`,{method: 'DELETE',
  });
    // axios.delete(`http://localhost:3000/todos?id=${item.id}`).then(() => {
    //   // setData(...data.filter((item) => item.id !== id))
    //   let data = data.filter((el) => el.id !== id);
    //   console.log(data);
    //   setData(data);
  }

    // console.log(data[0]);
    const handleChange = (event) => {
      setIsChecked(prev => !prev);
      event.completed = !isChecked;

      console.log(event.completed, isChecked);
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
        <div>
          <ul>
            {data.map(item => (
              <li key={item.id} ><input type="checkbox" checked={item.completed ? true : false} onChange={handleChange} />
                Id: {item.id} Titel: {item.title} <button onClick={DeleteTodo(item)}>Delete</button></li>
            ))}


          </ul>
        </div>
      </>
    );
  }
  export default Todos;
