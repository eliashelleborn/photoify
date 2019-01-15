import React from 'react';
import styled from 'styled-components';

import Search from '../../Search';

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
  background-color: lightgrey;
  padding: 20px;
`;

const Menu = ({ menuIsOpen }) => {
  return (
    <StyledMenu menuIsOpen={menuIsOpen}>
      <Search />
    </StyledMenu>
  );
};

export default Menu;
