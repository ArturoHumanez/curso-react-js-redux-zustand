import { useState, useEffect } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login/Login'

function App() {


  return (
    // <Login/>
    <Router>
      <Routes>
        <Route path='/login' element ={<Login/>}></Route>
        <Route path='/home' element ={<Home/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
