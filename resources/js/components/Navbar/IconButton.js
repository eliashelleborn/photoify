import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledIconButton = styled.button`
  border: none;
  background: none;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const IconButton = props => {
  return (
    <StyledIconButton onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
    </StyledIconButton>
  );
};

export default IconButton;
