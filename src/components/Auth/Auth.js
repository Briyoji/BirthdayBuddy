import React, { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from '../../utility/redux-store/authSlice';

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { authData } = useSelector((state) => state.auth);
  const { authRoute } = useSelector((state) => state.utils);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails()).then((res) => {
      if (res.payload.status && res.payload.token !== null) {
        navigate("/");
      }
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    })
    
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="auth-container">
        {isLoaded ? (
          authRoute === "login" ? (
            <Login />
          ) : authRoute === "signup" ? (
            <SignUp />
          ) : (
            navigate("/404")
          )
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </>
  );
}

export default Auth;
