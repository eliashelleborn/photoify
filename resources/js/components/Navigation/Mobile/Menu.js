import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useStore, useAction } from 'easy-peasy';
import { Link } from 'react-router-dom';

import Search from '../../Search';
import UserInfo from './UserInfo';

const StyledMenu = styled.div`
  position: absolute;
  top: 0;
  left: 100vw;
  width: 100vw;
  height: 100vh;
  transform: translateX(${({ menuIsOpen }) => (menuIsOpen ? '-100vw' : '0')});
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-delay: ${({ menuIsOpen }) => (!menuIsOpen ? '.2s' : '0s')};
  z-index: 950;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  width: 100%;
  max-width: 300px;
  justify-content: center;
  margin-top: 10px;
  border-top: 1px solid lightgrey;

  a {
    flex: 1;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    font-size: 18px;
  }
`;

const Menu = ({ menuIsOpen, closeMenu }) => {
  const { authenticatedUser, isAuthenticated } = useStore(state => state.auth);
  const { logout } = useAction(dispatch => dispatch.auth);
  return (
    <StyledMenu menuIsOpen={menuIsOpen}>
      <Search />
      {isAuthenticated && <UserInfo user={authenticatedUser} />}
      <Links>
        {isAuthenticated && (
          <Fragment>
            <Link onClick={closeMenu} to={`/${authenticatedUser.username}`}>
              PROFILE
            </Link>
            <Link onClick={closeMenu} to="/settings">
              SETTINGS
            </Link>
            <a
              onClick={e => {
                e.preventDefault();
                logout();
                closeMenu();
              }}
            >
              LOGOUT
            </a>
          </Fragment>
        )}
        {!isAuthenticated && (
          <Fragment>
            <Link onClick={closeMenu} to="/login">
              Login
            </Link>
            <Link onClick={closeMenu} to="/register">
              Register
            </Link>
          </Fragment>
        )}
      </Links>
    </StyledMenu>
  );
};

export default Menu;
