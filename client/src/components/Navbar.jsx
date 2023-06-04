import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        <li>
          <NavLink to="/">SHOP</NavLink>
        </li>
        |
        <li>
          <NavLink to="/order">SHOPPING CART</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
