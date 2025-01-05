import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Project from './pages/Project'
import AuthUser from './auth/AuthUser'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AuthUser><Home/></AuthUser>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/project' element={<AuthUser><Project/></AuthUser>}/>
      </Routes>
    </div>
  )
}

export default App