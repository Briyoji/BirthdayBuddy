import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom'
import { setUtil } from '../utility/redux-store/utilSlice';

function Navbar() {
  const dispatch = useDispatch();

  const { isNavbarOpen } = useSelector(state => state.utils);
  
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleNavMenu = (data, count = 0) => {
    setIsVisible(!isVisible);

    if (!isNavbarOpen && count === 0) {
      document.querySelector(".logo").style.display = "none";
      document.querySelector(".nav-links").style.display = "flex";

      setTimeout(() => {
        toggleNavMenu(data, count + 1);
      }, 7000);
      dispatch(setUtil({"isNavbarOpen": true}))
    } else {
      document.querySelector(".logo").style.display = "flex";
      document.querySelector(".nav-links").style.display = "none";
      dispatch(setUtil({"isNavbarOpen": false}))
    }
    
  }
  
  return (
    <>
      <nav className="navbar">
        <Link
          id="logo"
          to="/"
          className={`logo slide-${isVisible ? "out" : "in"}`}
        >
          Birthday<span>Buddy</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link className="nav-link" to="/auth">
              <i className="fa-solid fa-user"></i>
            </Link>
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
          onClick={toggleNavMenu}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleNavMenu();
            }
          }}
        />
      </nav>
    </>
  );
}

export default Navbar