import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useStore, useAction } from 'easy-peasy';
import styled from 'styled-components';

const StyledNavbar = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: inline-block;
    }
  }
`;

const Navbar = () => {
  const { authenticatedUser, isAuthenticated } = useStore(state => state.auth);
  const logout = useAction(dispatch => dispatch.auth.logout);
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated && (
          <Fragment>
            <li>
              <Link to={`/${authenticatedUser.username}`}>My Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </Fragment>
        )}
        {!isAuthenticated && (
          <Fragment>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </Fragment>
        )}
      </ul>
      {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
    </div>
  );
};

export default Navbar;
