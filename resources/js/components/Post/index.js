import React, { useState } from 'react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';

// Components
import Header from './Header';
import Overlay from './Overlay';
import Img from '../Img';

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 200px;
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

const Post = post => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  return (
    <StyledPost>
      <Header user={post.user} createdAt={post.created_at} />
      <ImageWrapper>
        <img src={post.image} alt="" onClick={() => setOverlayOpen(true)} />
        <Overlay
          isOpen={overlayOpen}
          post={post}
          close={() => setOverlayOpen(false)}
        />
      </ImageWrapper>
    </StyledPost>
  );
};

export default Post;
