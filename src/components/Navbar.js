// import React, {useState} from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toggleNavbar } from '../utility/redux-store/utilSlice';
import { getUserDetails } from '../utility/redux-store/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const authData = useSelector(state => state.auth.authData);
  const { isNavbarOpen } = useSelector(state => state.utils);
  
  const handleUserLink = () => {
    dispatch(getUserDetails());
    if (authData.status && authData.token !== null) {
      dispatch(toggleNavbar(!isNavbarOpen));
      navigate("/user/profile");
    } else {
      navigate("/auth");
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link
          id="logo"
          to="/"
          className={`logo slide-${isNavbarOpen ? "out" : "in"}`}
        >
          Birthday<span>Buddy</span>
        </Link>
        <ul className="nav-links">
          <li>
            <div className="nav-link" onClick={handleUserLink}>
              <i className="fa-solid fa-user"></i>
            </div>
          </li>
          <li>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
        </ul>
        <i
          tabIndex="0"
          className={`fa-solid fa-${
            isNavbarOpen ? "close" : "bars"
          } menu-open-cta`}
          onClick={() => dispatch(toggleNavbar(!isNavbarOpen))}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              dispatch(toggleNavbar(!isNavbarOpen));
            }
          }}
        />
      </nav>
    </>
  );
}

export default Navbar