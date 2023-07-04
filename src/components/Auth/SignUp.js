import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function SignUp() {

  const [isPassVisible, setIsPassVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const initialState = {
    name:"",
    username:"",
    email:"",
    password:"",
    birthdate:"",
    public:true
  }

  const [signupData, setSignupData] = useState(initialState);
  console.log(signupData);

  const dataSet = [
    { content: "username", type: "text" },
    { content: "name", type: "text" },
    { content: "birthdate", type: "date" },
  ];

  const handleSignup = (e) => {
    console.log("signupData", signupData);
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
                    <i className="fa-solid fa-id-badge fa-lg"></i>
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
                    console.log(e.key);
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
                <i className="fa-solid fa-triangle-exclamation"></i>
                <h3 className="auth-form-group-error">
                  Personal Detail Error!
                </h3>
              </div>
          </div>
          <div className="auth-form-group flex-col">
            <h3 className="auth-form-group-title">Credentials</h3>
            <div className="auth-form-group-content flex-col">
              <label className="auth-form-group-label" htmlFor="email">
                Email
              </label>
              <div className="auth-input-block">
                <i className="fa-solid fa-id-badge fa-lg"></i>
                <input
                  className="auth-form-group-input"
                  required
                  type="text"
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <i className="fa-solid fa-triangle-exclamation"></i>
                <h3 className="auth-form-group-error">
                  Passwords Do Not Match!
                </h3>
              </div>
          </div>

          <h4 className="auth-form-submit-btn" onClick={() => {handleSignup(signupData)}}>signup</h4>

          <Link to="/auth/login" className="auth-user-redirect">
            Already a user? Login
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp