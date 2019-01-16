import React from 'react';
import styled from 'styled-components';

import Img from '../../Img';
import UserStats from '../../UserStats';

const StyledUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;

  h3 {
    font-size: 20px;
    margin: 15px 0 20px 0;
    font-weight: bold;
  }
`;

const Avatar = styled.div`
  width: 200px;
  height: 200px
  position: relative;
  z-index: -1;
  img {
    border-radius: 200px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const UserInfo = ({ user }) => {
  return (
    <StyledUserInfo>
      {user.avatar && (
        <Avatar>
          <img src={user.avatar} alt="" />
        </Avatar>
      )}

      <h3>{user.username}</h3>
      <UserStats
        following={user.following_count}
        followers={user.followers_count}
        votes={user.votes_count}
      />
    </StyledUserInfo>
  );
};

export default UserInfo;
