import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledPhotoButton = styled.label`
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  input {
    display: none;
  }
`;

const PhotoButton = ({ onUpload }) => {
  return (
    <StyledPhotoButton>
      <FontAwesomeIcon icon="camera" />
      <input type="file" accept="image/*" onChange={e => onUpload(e)} />
    </StyledPhotoButton>
  );
};

export default PhotoButton;
