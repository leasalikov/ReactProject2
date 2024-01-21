import React, { useRef, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const Todos = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [UserTodos, setUserTodos] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [showTodoDetails, setShowTodoDetails] = useState(false);
  const [viewItemUpdate, setViewItemUpdate] = useState(false);

  // const [todo, setTodo] = useState({ userId: '', id: '', title: '', completed: false });
  const [nextId, setNextId] = useState();
  const { register, handleSubmit } = useForm();
  const itemId = useRef(0);

  useEffect(() => {
    //users todo
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(response => response.json())
      .then(json => {
        setUserTodos(json.map(j => { return { ...j, display: false } }));
        //   localStorage.setItem('userTodos', JSON.stringify(json));
      });

    //fech next id
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
    const strAscending = [...UserTodos].sort((a, b) =>
      a.id - b.id,
    );
    setUserTodos(strAscending);
  }

  const SortByComplete = () => {
    const strAscending = [...UserTodos].sort((a, b) =>
      b.completed - a.completed,
    );
    setUserTodos(strAscending);
  }

  const SortByAlphabetical = () => {
    const strAscending = [...UserTodos].sort((a, b) =>
      b.title > a.title ? -1 : 1,
    );
    setUserTodos(strAscending);
  }

  const SortByRandom = () => {
    const strAscending = [...UserTodos].sort((a, b) =>
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
        setUserTodos((prevUserTodos) => prevUserTodos.filter((todo) => todo.id !== item.id));
      } catch (error) {
        console.error('שגיאה במחיקת הפריט', error);
      }
    }
  };


  // useEffect(() => {
  //   //fech next id
  //   fetch("http://localhost:3000/nextIDs/2")
  //     .then(response => {
  //       if (!response.ok)
  //         throw 'Error' + response.status + ': ' + response.statusText;
  //       return response.json();
  //     })
  //     .then((json) => {
  //       setNextId(json.nextId)
  //     }).catch(ex => alert(ex))

  //   //fech todos
  //   fetch(`http://localhost:3000/todos?userId=${userDetailes.id}`)
  //     .then(response => {
  //       if (!response.ok)
  //         throw 'Error' + response.status + ': ' + response.statusText;
  //       return response.json();
  //     })
  //     .then(UserTodos => {
  //       setUserTodos(UserTodos);
  //       // setUserTodos(UserTodos.map(todo => { return { ...todo, editables: false } }));
  //       let todosArr = []
  //       for (let i = 0; i < UserTodos.length; i++)
  //         todosArr.push({ ...UserTodos[i], i: i, editable: false })
  //       setTodos(todosArr);
  //     }).catch(ex => alert(ex))
  // }, [])
  const UpdateTodo = async (title) => {
    try {
      await fetch(`http://localhost:3000/todos/${itemId.current}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: title.title,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      setUserTodos(
        UserTodos.map((UserTodos) =>
          UserTodos.id === itemId.current
            ? {
              ...UserTodos,
              title: title.title
            }
            : { ...UserTodos }
        ));
    } catch (error) {
      console.error('שגיאה בהוספת הפריט', error);
    }
  }



  function AddTodo(event) {
    event.preventDefault();
    const newTask = { userId: user.id, id: `${nextId}`, title: event.target[0].value, completed: false }
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then(response => {
      if (!response.ok)
        throw 'Error' + response.status + ': ' + response.statusText;
    }).then(() => {
      setUserTodos(prev => [...prev, newTask])
      // setTodos(prev => [...prev, { ...newTask, i: userTodos.length, editable: false }])//???
      setShowTodoDetails(false);
      setNextId(prev => prev + 1)
    }).catch((ex) => alert(ex));
  }


  //בדיקה אם יש עוד כזאת משימה
  // const response = await fetch(`http://localhost:3000/todos?title=${todo.title}&userId=${todo.userId}`);
  // const UserTodos = await response.json();
  // if (!(UserTodos.length === 0))
  //     alert("You have already that todo!");

  // console.log(UserTodos);

  const UpdateTodoStatus = (item) => {
    console.log(item.completed);
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
      <br />
      <button onClick={() => { setShowTodoDetails(true) }}>Add Todo</button>
      {showTodoDetails && <form onSubmit={AddTodo}>
        <input required placeholder='Write the title of todo' id='' name=''></input>
        <button type="submit">Ok</button>
      </form>}
      {viewItemUpdate && <form onSubmit={handleSubmit(UpdateTodo)}>
        <input required placeholder='Write a new title of the todo' id='' name='title' {...register("title")}></input>
        <button type="submit">Ok</button>
      </form>}
      <div>
        <ul>
          {UserTodos.map(item => (
            <li key={item.id}>
              <input type="checkbox" checked={item.completed} onChange={() => UpdateTodoStatus(item)} />
              Id: {item.id} Title: {item.title}
              <button onClick={() => DeleteTodo(item)}>Delete</button>
              <button onClick={() => { { itemId.current = item.id }; setViewItemUpdate(true) }}>Update</button>
            </li>
          ))}

        </ul>
      </div>
    </>
  );
}

export default Todos;
