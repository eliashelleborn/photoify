import React from 'react';
import styled from 'styled-components';
import { MdHome, MdPhotoCamera } from 'react-icons/md';

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

const CircleButton = styled.button`
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
  font-size: 20px;
  transform: translateX(
    ${({ startPosX, menuIsOpen }) => (menuIsOpen ? '0px' : startPosX)}
  );
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-delay: ${({ menuIsOpen }) => (!menuIsOpen ? '0s' : '.2s')};
  -webkit-tap-highlight-color: transparent;
  &:focus {
    outline: 0;
  }
  svg {
    color: #1d1d1d;
  }
`;

const CircleButtons = ({ menuIsOpen }) => {
  return (
    <StyledCircleButtons>
      <CircleButton menuIsOpen={menuIsOpen} startPosX="155px">
        <MdHome />
      </CircleButton>
      <CircleButton menuIsOpen={menuIsOpen} startPosX="85px">
        <MdPhotoCamera />
      </CircleButton>
    </StyledCircleButtons>
  );
};

export default CircleButtons;
