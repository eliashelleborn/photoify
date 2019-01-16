import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';

import VoteButtons from './VoteButtons';
import { useStore } from 'easy-peasy';

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
  height: 100%;
  pointer-events: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ClickMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
`;

const Options = styled.div`
  margin-bottom: auto;
  display: flex;
  justify-content: flex-end;
  a {
    color: #fff;
    font-size: 35px;
    margin-right: -7px;
    pointer-events: all;
  }
`;

const Overlay = ({ isOpen, close, post }) => {
  const { authenticatedUser, isAuthenticated } = useStore(state => state.auth);
  return (
    <StyledOverlay isOpen={isOpen}>
      <ClickMask onClick={close} />
      <Content>
        {isAuthenticated &&
          authenticatedUser.id === post.user_id && (
            <Options>
              <Link to={`/edit-post?post=${post.id}`}>
                <MdEdit />
              </Link>
            </Options>
          )}
        <VoteButtons post={post} />
      </Content>
    </StyledOverlay>
  );
};

export default Overlay;
