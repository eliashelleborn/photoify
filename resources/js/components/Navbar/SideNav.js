import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStore, useAction } from 'easy-peasy';

const StyledMobileNav = styled.nav`
  display: flex;
  position: fixed;
  top: 56px;
  right: 0px;
  width: 100%;
  height: calc(100vh - 56px);
  background-color: white;

  transform: translateX(${props => (props.isOpen ? '0' : '100vw')});
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const MobileNav = ({ isOpen, close }) => {
  const { logout } = useAction(dispatch => dispatch.auth);
  const { authenticatedUser } = useStore(state => state.auth);
  return (
    <StyledMobileNav isOpen={isOpen}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Profile</Link>
        </li>
        <li>
          <Link to="/">Settings</Link>
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
    </StyledMobileNav>
  );
};

export default MobileNav;
