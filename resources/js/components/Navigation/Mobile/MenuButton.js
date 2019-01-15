import React from 'react';
import styled from 'styled-components';
import { MdMenu, MdClose } from 'react-icons/md';

const StyledMenuButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 75px;
  height: 75px;
  border-radius: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 4px 1px rgba(167, 167, 167, 0.5);
  font-size: 33px;
  background-color: #fff;
  z-index: 1000;
  transition: 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 3px 0px rgba(167, 167, 167, 0.5);
    background-color: #fcfcfc;
  }

  button {
    color: #1d1d1d;
    -webkit-tap-highlight-color: transparent;

    &:focus {
      outline: 0;
    }
  }
`;

const MenuButton = ({ onClick, menuIsOpen }) => {
  return (
    <StyledMenuButton onClick={onClick}>
      <button
        className={`hamburger hamburger--elastic ${
          menuIsOpen ? 'is-active' : ''
        }`}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
    </StyledMenuButton>
  );
};

export default MenuButton;
