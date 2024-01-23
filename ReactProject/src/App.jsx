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



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="users/:userId">
            <Route path="home" element={<Home />}>
              <Route path="info" element={<Info />} />
              <Route path='todos' element={<Todos />} />
              <Route path="posts" element={<Posts />} >
                {/* <Route path="comments" element={<Comments />} /> */}
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
    // <>
    //   <Router>
    //     <div className='App'>
    //       <Routes>
    //         {/* <Route path="/Home/Albums" element={<Albums />} /> */}
    //         <Route path="/Home/Posts" element={<Posts />} />
    //         <Route path="/Home/Todos" element={<Todos />} />
    //         <Route path="/" element={<LogIn />} />
    //         <Route path="/Register" element={<Register />} />
    //         {/* <Route path="/FillDetails" element={<FillDetails />} /> */}
    //         <Route path="/LogIn" element={<LogIn />} />

    //         <Route path="/Home/Albums" element={<Albums />} />
    //           <Route path="/Home/Albums/:id/Photos" element={<Photos />} />
    //             {/* <Route index element={<Photos />} /> */}
    //           {/* </Route> */}
    //         {/* </Route> */}

    //         <Route path="/" element={<LogIn />} />
    //         <Route path="/Register" element={<Register />} />
    //       </Routes>
    //     </div>
    //   </Router>
    // </>

export default App;
