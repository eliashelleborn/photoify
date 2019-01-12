import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledBurgerButton = styled.button`
  border: none;
  background: none;
  padding: 10px;
  display: flex;
  align-items: center;
  &:focus {
    outline: 0;
  }
`;

const BurgerButton = () => {
  return (
    <StyledBurgerButton>
      <FontAwesomeIcon icon="bars" />
    </StyledBurgerButton>
  );
};

export default BurgerButton;
