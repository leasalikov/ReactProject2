import React, { useRef, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { IoTrashOutline } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";

const Todos = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [UserTodos, setUserTodos] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [showTodoDetails, setShowTodoDetails] = useState(false);
  const [viewItemUpdate, setViewItemUpdate] = useState(false);
  const [showsearchBox, setShowsearchBox] = useState(false);
  const [allUserTodos, setAllUserTodos] = useState([]);
  const [nextId, setNextId] = useState();
  const { register, handleSubmit } = useForm();
  const itemId = useRef(0);
  const searchValue=useRef(0)
  useEffect(() => {
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(response => response.json())
      .then(json => {
        setAllUserTodos(json.map(j => { return { ...j, display: false } }));
        setUserTodos(json.map(j => { return { ...j, display: false } }));
      });
    fetch("http://localhost:3000/nextIDs/2")
      .then(response => {
        if (!response.ok)
          throw 'Error' + response.status + ': ' + response.statusText;
        return response.json();
      })
      .then((json) => {
        setNextId(json.nextId)
      }).catch(ex => alert(ex))
  }, []);


  const SortBySerial = () => {
    const strAscending = [...allUserTodos].sort((a, b) =>
      a.id - b.id,
    );
    setUserTodos(strAscending);
  }

  const SortByComplete = () => {
    const strAscending = [...allUserTodos].sort((a, b) =>
      b.completed - a.completed,
    );
    setUserTodos(strAscending);
  }

  const SortByAlphabetical = () => {
    const strAscending = [...allUserTodos].sort((a, b) =>
      b.title > a.title ? -1 : 1,
    );
    setUserTodos(strAscending);
  }

  const SortByRandom = () => {
    const strAscending = [...allUserTodos].sort((a, b) =>
      Math.random() - 0.5
    );
    setUserTodos(strAscending);
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
    const userConfirmed = window.confirm('Do you want to delete this todo?');
    if (userConfirmed) {
      try {
        await fetch(`http://localhost:3000/todos/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setAllUserTodos((prevUserTodos) => prevUserTodos.filter((todo) => todo.id !== item.id));
        setUserTodos((prevUserTodos) => prevUserTodos.filter((todo) => todo.id !== item.id));

      } catch (error) {
        console.error('Detele Error', error);
      }
    }
  };

  const UpdateTodo = async (data) => {
    try {
      await fetch(`http://localhost:3000/todos/${itemId.current}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: data.title,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      setAllUserTodos(
        allUserTodos.map((todo) =>
          todo.id === itemId.current
            ? { ...todo, title: data.title }
            : todo
        ));
        setUserTodos(UserTodos.map((todo) =>
        todo.id === itemId.current
          ? { ...todo, title: data.title }
          : todo
      ));
    } catch (error) {
      console.error('Update Error', error);
    }
  }



  function AddTodo(event) {
    event.preventDefault();
    fetch("http://localhost:3000/nextIDs/2", 
    {
       method: 'PATCH',
       body: JSON.stringify({
           nextId:nextId+1,
       }),      headers: {
           'Content-type': 'application/json; charset=UTF-8',
       },
       });
    const newTask = { userId: user.id, id: `${nextId}`, title: event.target[0].value, completed: false }
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then(response => {
      if (!response.ok)
        throw 'Error' + response.status + ': ' + response.statusText;
    }).then(() => {
      setAllUserTodos(prev => [...prev, newTask])
      setUserTodos(prev => [...prev, newTask]);
      setShowTodoDetails(false);
      setNextId(prev => prev + 1);
    }).catch((ex) => alert(ex));
  }

  const UpdateTodoStatus = (item) => {
    item.completed = !item.completed;
    setIsChecked(prev => !prev);
    fetch(`http://localhost:3000/todos/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    console.log(item.completed + " " + item.id + " " + item.userId + " " + item.title);
  }
  
  const Search = (data) => {
    setShowsearchBox(false);

    let val = searchValue.current;
    if (val == 'All') {
      setUserTodos(allUserTodos)
    }
    else {
      let arr = allUserTodos;
      const filteredByValue = arr.filter(obj => {
        return obj[val] == data.valueToSearch;
      });
      if (filteredByValue.length === 0) {
        alert("There is no argument with this value")
        return;
    }
      setUserTodos(filteredByValue);
    }
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
      <select defaultValue onChange={(e) => { (e.target.value!=='All')?setShowsearchBox(true):null; searchValue.current = e.target.value }} >
        <option value="All">Search</option>
        <option value="All">All</option>
        <option value="id">Id</option>
        <option value="title">Title</option>
        <option value="completed">ExecutionMode 0/1</option>
      </select>
       <form onSubmit={handleSubmit(Search)}>
        {showsearchBox && <input  placeholder='Write the value of search' id='' name='valueToSearch' {...register("valueToSearch")}></input>}
        <button type="submit">search</button></form>

      <br />
      <button onClick={() => { setShowTodoDetails(!showTodoDetails) }}>Add Todo</button>
      {showTodoDetails && <form onSubmit={AddTodo}>
        <input required placeholder='Write the title of todo' id='' name=''></input>
        <button type="submit">OK</button>
      </form>}
      {viewItemUpdate && <form onSubmit={handleSubmit(UpdateTodo)}>
        <input required placeholder='Write a new title of the todo' id='' name='title' {...register("title")}></input>
        <button type="submit">OK</button>
      </form>}
      <div>
        <ul>
          {UserTodos.map(item => (
            <li key={item.id}>
              <input type="checkbox" checked={item.completed} onChange={() => UpdateTodoStatus(item)} />
              <b>Id: </b>{item.id} <b>Title: </b>{item.title}
              <button onClick={() => DeleteTodo(item)}><IoTrashOutline /></button>
              <button onClick={() => { { itemId.current = item.id }; setViewItemUpdate(true) }}><LuClipboardEdit /></button>
            </li>
          ))}

        </ul>
      </div>
    </>
  );
}

export default Todos;
