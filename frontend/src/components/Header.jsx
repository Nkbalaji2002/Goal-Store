import { FaSignInAlt, FaSignOutAlt, FaUber } from "react-icons/fa";

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to={"/"}>Goal Setter</Link>
        </div>
        <ul>
          <li>
            <FaSignInAlt />
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <FaUber />
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
