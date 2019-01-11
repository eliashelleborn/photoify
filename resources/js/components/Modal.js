import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transition: all 0.3s ease;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
`;

const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  visibility: hidden;
`;

const ModalBox = styled.div`
  margin: 0 15px;
  width: 100%;
  background-color: white;
  padding: 15px;
  visibility: visible;
`;

const TintOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = ({ children, modalState, setModalState }) => {
  return (
    <StyledModal isOpen={modalState.isOpen}>
      <TintOverlay
        onClick={() =>
          setModalState({ isOpen: false, content: modalState.content })
        }
      />
      <ModalWrapper>
        <ModalBox>{children}</ModalBox>
      </ModalWrapper>
    </StyledModal>
  );
};

export default Modal;
