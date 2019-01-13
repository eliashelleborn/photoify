import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStore, useAction } from 'easy-peasy';

const StyledSideNav = styled.nav`
  position: fixed;
  top: 56px;
  right: 0px;
  width: 100%;
  height: calc(100vh - 56px);
  display: flex;
  flex-direction: column;
  transform: translateX(${props => (props.isOpen ? '0' : '100vw')});
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: white;
`;

const SideNav = ({ isOpen, close }) => {
  const { logout } = useAction(dispatch => dispatch.auth);
  const { authenticatedUser, isAuthenticated } = useStore(state => state.auth);
  return (
    <StyledSideNav isOpen={isOpen}>
      <div>{isAuthenticated && <h3>{authenticatedUser.username}</h3>}</div>
      <ul>
        <li>
          <Link onClick={close} to="/">
            Home
          </Link>
        </li>
        <li>
          {isAuthenticated && (
            <Link onClick={close} to={`/${authenticatedUser.username}`}>
              Profile
            </Link>
          )}
        </li>
        <li>
          <Link onClick={close} to="/">
            Settings
          </Link>
        </li>
        <li>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              logout();
              close();
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </StyledSideNav>
  );
};

export default SideNav;
