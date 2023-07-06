import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setError } from '../../utility/redux-store/authSlice';
import { setUtil } from '../../utility/redux-store/utilSlice';


function Login() {

  // helpers init
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting states
  const { errCredentials } = useSelector(state => state.auth);
  const [isPassVisible, setIsPassVisible] = useState(false);

  // initializing page
  useEffect(() => {
    dispatch(setError({"errCredentials": '‎'}))
    dispatch(setError({"errPersonalData": '‎'}))
  }, [dispatch])
  
  const initialState = {
    identifier: '',
    password: ''
  }
  const [loginCredentials, setLoginCredentials] = useState(initialState)

  const handleLogin = (data) => {
    dispatch(setError({"errCredentials": '‎'}))

    const allValuesNotEmpty = Object.values(data).every(value => value !== '');

    if (!allValuesNotEmpty) {
      dispatch(setError({"errCredentials": "Please fill all required field!"}))
      return;
    } else {
      dispatch(loginUser(loginCredentials)).then((res) => {
        if (res.payload.authToken !== null && res.payload.status) {
          navigate("/");
        }
      });
    }
  }

  return (
    <>
      <div className="login-form-container flex-col">
        <form className="login-form flex-col">
          <h1 className='auth-type-title'>Login</h1>
          <div className="auth-form-group flex-col">
            <h3 className='auth-form-group-title' >Credentials</h3>
            <div className='auth-form-group-content flex-col'>
              <label className='auth-form-group-label' htmlFor="email">Identifier</label>
              <div className="auth-input-block">
                <i className="fa-solid fa-id-badge fa-lg"></i>
                <input className='auth-form-group-input' required type="text" placeholder='username or email...' name="email" id="email" value={loginCredentials.identifier} onChange={e => setLoginCredentials({...loginCredentials, identifier: e.target.value})} />
              </div>
              <label className='auth-form-group-label' htmlFor="password">Password</label>
              <div className="auth-input-block">
                <i className="fa-solid fa-user-lock"></i>
                <input className='auth-form-group-input' required type={isPassVisible?'text':'password'} placeholder='password...' name="password" id="password" value={loginCredentials.password} onChange={e => setLoginCredentials({...loginCredentials, password: e.target.value})} />
                {loginCredentials.password !== '' && <i className={`fa-regular pass-reveal-icon fa-eye${isPassVisible?'':'-slash'}`} onClick={() => {setIsPassVisible(!isPassVisible)}} />}
              </div>
            </div>
            <div className="form-group-error">
                {(errCredentials !== '‎') && <i className="fa-solid fa-triangle-exclamation"></i>}
                <h3 className="auth-form-group-error">
                  {errCredentials}
                </h3>
              </div>
          </div>

          <h4
            className="auth-form-submit-btn"
            tabIndex="0"
            onClick={() => {
              handleLogin(loginCredentials);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleLogin(loginCredentials);
              }
            }}
          >
            login
          </h4>

          <span className="auth-user-redirect" onClick={() => {dispatch(setUtil({'authRoute' : 'signup'}))}}>
            Don't have an account? Sign up
          </span>
          {/* <Link to='/auth/forgotpassword' className="auth-user-redirect">
            Forgot Password?
          </Link> */}
        </form>
      </div>
    </>
  )
}

export default Login