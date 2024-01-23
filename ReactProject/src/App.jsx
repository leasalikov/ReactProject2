import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css'
import LogIn from './components/LogIn';
import Home from './components/Home';
import Register from './components/Register';
// import FillDetails from './components/FillDetails';
import Todos from './components/Todos';
import Albums from './components/Albums';
import Posts from './components/Posts';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
          <div className='App'>
          <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Home/Albums" element={<Albums />} />
          <Route path="/Home/Posts" element={<Posts />} />
          <Route path="/Home/Todos" element={<Todos />} />
          <Route path="/" element={<LogIn />} />
          <Route path="/Register" element={<Register />} />
          {/* <Route path="/FillDetails" element={<FillDetails />} /> */}
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Photos" element={<Photos />} />

        </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
