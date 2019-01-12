import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledTakePhoto = styled.label`
  cursor: pointer;
  input {
    display: none;
  }
`;

const TakePhoto = ({ onUpload }) => {
  return (
    <StyledTakePhoto>
      <FontAwesomeIcon icon="camera" />
      <input type="file" accept="image/*" onChange={e => onUpload(e)} />
    </StyledTakePhoto>
  );
};

export default TakePhoto;
