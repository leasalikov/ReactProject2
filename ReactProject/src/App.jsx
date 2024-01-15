import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import LogIn from './components/LogIn';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <LogIn></LogIn>
    </Router>
    </>
  )
}

export default App
