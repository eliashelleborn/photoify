import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useStore, useAction } from 'easy-peasy';
import styled from 'styled-components';
import { withRouter } from 'react-router';

// Components
import TakePhoto from './TakePhoto';

const StyledNavbar = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: inline-block;
      padding: 5px;
    }
  }
`;

const Navbar = props => {
  /*   const [redirect, setRedirect] = useState(null); */
  const { authenticatedUser, isAuthenticated } = useStore(state => state.auth);
  const logout = useAction(dispatch => dispatch.auth.logout);

  // Handle redirects (Take photo etc.)
  /*   if (redirect) {
    const to = redirect;
    setRedirect(null);
    console.log(to);
    return <Redirect to={to} />;
  } */

  return (
    <StyledNavbar>
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
      {isAuthenticated && (
        <Fragment>
          <button onClick={() => logout()}>Logout</button>
          <TakePhoto
            onUpload={e =>
              props.history.push({
                pathname: '/create-post',
                state: { image: URL.createObjectURL(e.target.files[0]) }
              })
            }
          />
        </Fragment>
      )}
    </StyledNavbar>
  );
};

export default withRouter(Navbar);
