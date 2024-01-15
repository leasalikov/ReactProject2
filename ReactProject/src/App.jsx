import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import LogIn from './components/LogIn';
import Home from './components/Home';
import Register from './components/Register';
import FillDetails from './components/FillDetails';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <div className='App'>
      <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/FillDetails" element={<FillDetails />} />
      </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
