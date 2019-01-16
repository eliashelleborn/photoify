import React, { Fragment } from 'react';
import styled from 'styled-components';

const StyledVoteBar = styled.div`
  height: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
`;

const Likes = styled.div`
  background-color: #73c37b;
  height: 100%;
`;

const Dislikes = styled.div`
  background-color: #e36e6e;
  height: 100%;
`;

const Count = styled.div`
  height: 30px;
  width: 1px;
  background-color: #fff;
  z-index: 900;
  margin-top: -20px;
  position: relative;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: 0.3s ease;
  span {
    position: absolute;
    top: 0;
    color: #fff;
    font-size: 16px;
    font-weight: normal;
  }
  span:first-child {
    right: 7px;
  }
  span:last-child {
    left: 7px;
  }
`;

const VoteBar = ({ post, overlayIsOpen }) => {
  /*   console.log(
    post.likes_count,
    post.dislikes_count,
    Math.round((post.likes_count / post.votes_count) * 100) || 50
  ); */
  return (
    <StyledVoteBar>
      {post.votes_count > 0 && (
        <Fragment>
          <Likes
            style={{
              width:
                Math.round((post.likes_count / post.votes_count) * 100) + '%'
            }}
          />

          <Count visible={overlayIsOpen}>
            <span>{post.likes_count}</span>
            <span>{post.dislikes_count}</span>
          </Count>

          <Dislikes
            style={{
              width:
                Math.round((post.dislikes_count / post.votes_count) * 100) + '%'
            }}
          />
        </Fragment>
      )}
    </StyledVoteBar>
  );
};

export default VoteBar;
