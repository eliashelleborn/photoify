import React from 'react';
import styled from 'styled-components';
import { MdHome, MdPhotoCamera } from 'react-icons/md';
import { Link } from 'react-router-dom';

const StyledCircleButtons = styled.div`
  position: fixed;
  right: 115px;
  bottom: 20px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 975;
`;

const CircleButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: none;
  background-color: #fff;
  box-shadow: 0 3px 4px 1px rgba(167, 167, 167, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;

  transform: translateX(
    ${({ startPosX, menuIsOpen }) => (menuIsOpen ? '0px' : startPosX)}
  );
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
      ${({ menuIsOpen }) => (!menuIsOpen ? '0s' : '.2s')},
    box-shadow 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    box-shadow: 0 2px 3px 0px rgba(167, 167, 167, 0.5);
    background-color: #fcfcfc;
  }

  &:focus {
    outline: 0;
  }

  & > * {
    font-size: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    input {
      display: none;
    }
    svg {
      color: #1d1d1d;
    }
  }
`;

const CircleButtons = ({ menuIsOpen, closeMenu, onUpload }) => {
  return (
    <StyledCircleButtons>
      <CircleButton menuIsOpen={menuIsOpen} startPosX="155px">
        <Link onClick={closeMenu} to="/">
          <MdHome />
        </Link>
      </CircleButton>
      <CircleButton menuIsOpen={menuIsOpen} startPosX="85px">
        <label>
          <MdPhotoCamera />
          <input type="file" accept="image/*" onChange={e => onUpload(e)} />
        </label>
      </CircleButton>
    </StyledCircleButtons>
  );
};

export default CircleButtons;
