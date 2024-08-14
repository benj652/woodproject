import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
const NavBar = () => {
  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <Link to={'/'} className="btn btn-ghost text-xl">
          <img src={logo} className="size-10" />
          Wood Classifier
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/tree/-1'}>Trees</Link>
          </li>
          <li>
            <Link to={'/about'}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
