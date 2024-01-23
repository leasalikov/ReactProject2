import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import './App.css'
import LogIn from './components/LogIn';
import Home from './components/Home';
import Register from './components/Register';
// import FillDetails from './components/FillDetails';
import Todos from './components/Todos';
import Albums from './components/Albums';
import Posts from './components/Posts';
import Photos from './components/Photos';
import Info from './components/Info';
import Comments from './components/Comments';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="users/:userId">
            <Route path="home" element={<Home />}>
              <Route path="info" element={<Info />} />
              <Route path='todos' element={<Todos />} />
              <Route path="posts" element={<Posts />} >
                <Route path="comments" element={<Comments />} />
              </Route>
              <Route path="albums" element={<Albums />} />
              <Route path='albums/:albumId/photos' element={<Photos />} />
            </Route>
          </Route>
          <Route path="/" element={<LogIn />} />
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="finishRegister" element={<FinishRegister />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
