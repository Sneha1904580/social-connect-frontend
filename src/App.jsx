import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AllPost from './pages/AllPost'
import Createpost from './pages/Createpost'
import Home from './pages/Home'
import About from './pages/About'
import ViewPost from './pages/ViewPost'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allpost" element={<AllPost />} />
        <Route path="/create-post" element={<Createpost />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:postId" element={<ViewPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
