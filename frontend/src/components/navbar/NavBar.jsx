import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useUserContext } from '../../context/UserContext';
import useLogOut from '../../hooks/useLogOut';
const NavBar = () => {
  const { logOut, loading } = useLogOut();
  const { user } = useUserContext();
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
            {user ? (
              loading ? (
                <span className="loading loading-spinner mr-2 opacity-30"></span>
              ) : (
                <button onClick={() => logOut()}>Logout</button>
              )
            ) : (
              <Link to={'/login'}>Login/Sign Up</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
