import React from 'react';
import styled from 'styled-components';

const StyledUserButton = styled.div`
  width: 33px;
  padding-bottom: 33px;
  margin-right: 5px;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const UserButton = ({ avatar }) => {
  return (
    <StyledUserButton>
      <img src={avatar} alt="" />
    </StyledUserButton>
  );
};

export default UserButton;
