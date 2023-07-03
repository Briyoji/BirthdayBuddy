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
          <div className="form-group flex-col">
            <label className='form-group-label' htmlFor="identifier">Username or Email</label>
            <div className="input-block">
              <i className="fa-solid fa-id-badge fa-lg"></i>
              <input className='form-group-input' type="text" name="identifier" id="identifier" value={loginCredentials.identifier} onChange={e => setLoginCredentials({...loginCredentials, identifier: e.target.value})} />
            </div>
          </div>

          <div className="form-group flex-col">  
            <label className='form-group-label' htmlFor="password">Password</label>
            <div className="input-block">
              <i className="fa-solid fa-user-lock"></i>
              <input className='form-group-input' type={isPassVisible?'text':'password'} name="password" id="password" value={loginCredentials.password} onChange={e => setLoginCredentials({...loginCredentials, password: e.target.value})} />
              {loginCredentials.password !== '' && <i className={`fa-regular pass-reveal-icon fa-eye${isPassVisible?'':'-slash'}`} onClick={() => {setIsPassVisible(!isPassVisible)}} />}
            </div>
          </div>

          <h4 className="auth-form-submit-btn">
            login
          </h4>

          <Link to='/auth/signup' className="auth-user-redirect">
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
    </>
  )
}

export default Login