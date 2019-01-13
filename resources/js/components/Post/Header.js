import React, { Fragment } from 'react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';

import Img from '../Img';

const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  min-height: 60px;
  img {
    border-radius: 50%;
  }
  p {
    margin: 0;
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  time {
    margin-left: auto;
  }
`;

const PostHeader = ({ user, createdAt, showUser }) => {
  return (
    <StyledHeader>
      {showUser && (
        <Fragment>
          <Img src={user.avatar} alt="" width="40px" height="40px" />
          <p>{user.username}</p>
        </Fragment>
      )}

      <TimeAgo date={new Date(createdAt + ' UTC').toString()} />
    </StyledHeader>
  );
};

export default PostHeader;
