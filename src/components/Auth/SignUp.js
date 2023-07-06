import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, setError } from '../../utility/redux-store/authSlice';
import { setUtil } from '../../utility/redux-store/utilSlice';

function SignUp() {

  // helpers init
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting states
  const { errCredentials, errPersonalData } = useSelector(state => state.auth);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  // initializing page
  useEffect(() => {
    dispatch(setError({"errCredentials": '‎'}))
    dispatch(setError({"errPersonalData": '‎'}))
  }, [dispatch])

  const initialState = {
    name:"",
    username:"",
    email:"",
    password:"",
    birthdate:"",
    public: false
  }

  const [signupData, setSignupData] = useState(initialState);

  const dataSet = [
    { content: "username", type: "text", icon: "id-badge" },
    { content: "name", type: "text", icon: "id-card" },
    { content: "birthdate", type: "date", icon: "cake-candles" },
  ];

  const handleSignup = (data) => {

    dispatch(setError({"errPersonalData": '‎'}))
    dispatch(setError({"errCredentials": '‎'}))

    const allValuesNotEmpty = Object.values(data).every(value => value !== '');
    const passwordsMatch = data.password === confirmPassword && data.password !== '';

    if (!allValuesNotEmpty) {
      dispatch(setError({"errPersonalData": "Please fill all required field!"}))
      dispatch(setError({"errCredentials": "Please fill all required field!"}))
      
      return;
    } else if (!passwordsMatch) {
      dispatch(setError({"errCredentials": "Passwords do not match!"}))
      return;
    }

    if (allValuesNotEmpty && passwordsMatch) {
      dispatch(signupUser(signupData)).then((res) => {
        if (res.payload.authToken !== null && res.payload.status) {
          console.log("Logged in!");
          navigate("/");
        }
      })
    }
  }

  return (
    <>
      <div className="signup-form-container flex-col">
        <form className="signup-form flex-col">
          <h1 className="auth-type-title">signup</h1>
          <div className="auth-form-group flex-col">
            <h3 className="auth-form-group-title">Personal Data</h3>
            {dataSet.map((data, index) => {
              return (
                <div className="auth-form-group-content flex-col" key={index}>
                  <label
                    className="auth-form-group-label"
                    htmlFor={data.content}
                  >
                    {data.content}
                  </label>
                  <div className="auth-input-block">
                    <i className={`fa-solid fa-${data.icon} fa-lg`}></i>
                    <input
                      className="auth-form-group-input"
                      required
                      type={data.type}
                      placeholder={data.content}
                      name={data.content}
                      id={data.content}
                      value={signupData[data.content]}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          [data.content]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              );
            })}
            <div className="auth-form-group-content flex-col">
              <div className="auth-input-block  auth-profile-type-input">
                <label className="auth-form-group-label" htmlFor="public">
                  Profile Type?
                </label>
                <input
                  className="tgl tgl-flip"
                  type="checkbox"
                  name="public"
                  id="public"
                  value={signupData.public}
                  onClick={(e) =>
                    setSignupData({ ...signupData, public: !signupData.public })
                  }
                />
                <label
                  tabIndex="0"
                  className={`tgl-btn ${signupData.public ? "bg-1" : "bg-2"}`}
                  data-s={signupData.public}
                  data-tg={signupData.public ? "public" : "private"}
                  htmlFor="public"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSignupData({
                        ...signupData,
                        public: !signupData.public,
                      });
                    }
                  }}
                ></label>
              </div>
            </div>
            <div className="form-group-error">
              {errPersonalData !== "‎" && (
                <i className="fa-solid fa-triangle-exclamation"></i>
              )}
              <h3 className="auth-form-group-error">{errPersonalData}</h3>
            </div>
          </div>
          <div className="auth-form-group flex-col">
            <h3 className="auth-form-group-title">Credentials</h3>
            <div className="auth-form-group-content flex-col">
              <label className="auth-form-group-label" htmlFor="email">
                Email
              </label>
              <div className="auth-input-block">
                <i className="fa-solid fa-at"></i>
                <input
                  className="auth-form-group-input"
                  required
                  type="email"
                  placeholder="email"
                  name="email"
                  id="email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                />
              </div>
              <label className="auth-form-group-label" htmlFor="password">
                Password
              </label>
              <div className="auth-input-block">
                <i className="fa-solid fa-user-lock"></i>
                <input
                  className="auth-form-group-input"
                  required
                  placeholder="password"
                  type={isPassVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                />
                {signupData.password !== "" && (
                  <i
                    className={`fa-regular pass-reveal-icon fa-eye${
                      isPassVisible ? "" : "-slash"
                    }`}
                    onClick={() => {
                      setIsPassVisible(!isPassVisible);
                    }}
                  />
                )}
              </div>
              <div className="auth-input-block">
                <i className="fa-regular fa-circle-check"></i>
                <input
                  className="auth-form-group-input auth-input-block-secondary"
                  required
                  placeholder="confirm password"
                  type={isPassVisible ? "text" : "password"}
                  name="confirm password"
                  id="confirm password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (e.target.value !== signupData.password) {
                      dispatch(
                        setError({ errCredentials: "Passwords do not match!" })
                      );
                    } else {
                      dispatch(setError({ errCredentials: "‎" }));
                    }
                  }}
                />
                {signupData.password !== "" && (
                  <i
                    className={`fa-regular pass-reveal-icon fa-eye${
                      isPassVisible ? "" : "-slash"
                    }`}
                    onClick={() => {
                      setIsPassVisible(!isPassVisible);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="form-group-error">
              {errCredentials !== "‎" && (
                <i className="fa-solid fa-triangle-exclamation"></i>
              )}
              <h3 className="auth-form-group-error">{errCredentials}</h3>
            </div>
          </div>

          <h4
            className="auth-form-submit-btn"
            tabIndex="0"
            onClick={() => {
              handleSignup(signupData);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSignup(signupData);
              }
            }}
          >
            signup
          </h4>

          <span className="auth-user-redirect" onClick={() => {dispatch(setUtil({'authRoute' : 'login'}))}}>
            Already a User? Login
          </span>
        </form>
      </div>
    </>
  );
}

export default SignUp