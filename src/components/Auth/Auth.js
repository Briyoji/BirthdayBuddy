import React from 'react'
import Login from './Login';
import SignUp from './SignUp';
import { Routes, Route } from 'react-router-dom';


function Auth() {
  return (
    <>
      <div className="auth-container">
        
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>

      </div>
    </>
  )
}

export default Auth