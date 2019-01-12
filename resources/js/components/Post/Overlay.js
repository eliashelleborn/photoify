import React from 'react';
import styled from 'styled-components';

import Vote from './Vote';

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transition: 0.5s ease;
`;

const Content = styled.div`
  z-index: 50;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ClickMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
`;

const Overlay = ({ isOpen, close }) => {
  return (
    <StyledOverlay isOpen={isOpen}>
      <ClickMask onClick={close} />
      <Content>
        <Vote stats={null} />
      </Content>
    </StyledOverlay>
  );
};

export default Overlay;
