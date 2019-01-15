import React, { useState } from 'react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';

// Components
import Header from './Header';
import Overlay from './Overlay';
import Img from '../Img';
import VoteBar from './VoteBar';

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 200px;
  z-index: 1;
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-bottom: 100%;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const Post = ({ post, showUser = true }) => {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  return (
    <StyledPost>
      <Header
        showUser={showUser}
        user={post.user}
        createdAt={post.created_at}
      />
      <ImageWrapper>
        <img src={post.image} alt="" onClick={() => setOverlayIsOpen(true)} />
        <Overlay
          isOpen={overlayIsOpen}
          post={post}
          close={() => setOverlayIsOpen(false)}
        />
      </ImageWrapper>
      <VoteBar overlayIsOpen={overlayIsOpen} post={post} />
    </StyledPost>
  );
};

export default Post;
