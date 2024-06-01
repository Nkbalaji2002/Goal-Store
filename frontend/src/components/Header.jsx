import { FaSignInAlt, FaSignOutAlt, FaUber } from "react-icons/fa";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/AuthSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to={"/"}>Goal Setter</Link>
        </div>
        <ul>
          {user ? (
            <>
              <li>
                <button className="btn" onClick={onLogOut}>
                  <FaSignOutAlt /> LogOut
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <FaSignInAlt />
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <FaUber />
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
