import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {

  const [isPassVisible, setIsPassVisible] = useState(false);
  
  const initialState = {
    identifier: '',
    password: ''
  }
  const [loginCredentials, setLoginCredentials] = useState(initialState)

  return (
    <>
      <div className="login-form-container flex-col">
        <form className="login-form flex-col">
          <h1 className='auth-type-title'>Login</h1>
          <div className="auth-form-group flex-col">
            <h3 className='auth-form-group-title' >Credentials</h3>
            <div className='auth-form-group-content flex-col'>
              <label className='auth-form-group-label' htmlFor="email">Email</label>
              <div className="auth-input-block">
                <i className="fa-solid fa-id-badge fa-lg"></i>
                <input className='auth-form-group-input' required type="text" placeholder='email...' name="email" id="email" value={loginCredentials.email} onChange={e => setLoginCredentials({...loginCredentials, email: e.target.value})} />
              </div>
              <label className='auth-form-group-label' htmlFor="password">Password</label>
              <div className="auth-input-block">
                <i className="fa-solid fa-user-lock"></i>
                <input className='auth-form-group-input' required type={isPassVisible?'text':'password'} placeholder='password...' name="password" id="password" value={loginCredentials.password} onChange={e => setLoginCredentials({...loginCredentials, password: e.target.value})} />
                {loginCredentials.password !== '' && <i className={`fa-regular pass-reveal-icon fa-eye${isPassVisible?'':'-slash'}`} onClick={() => {setIsPassVisible(!isPassVisible)}} />}
              </div>
            </div>
          </div>

          <h4 className="auth-form-submit-btn">
            login
          </h4>

          <Link to='/auth/signup' className="auth-user-redirect">
            Don't have an account? Sign up
          </Link>
          {/* <Link to='/auth/forgotpassword' className="auth-user-redirect">
            Forgot Password?
          </Link> */}
        </form>
      </div>
    </>
  )
}

export default Login