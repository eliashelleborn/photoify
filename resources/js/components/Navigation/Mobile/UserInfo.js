import React from 'react';
import styled from 'styled-components';

import Img from '../../Img';

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
  img {
    border-radius: 200px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 300px;

  & > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 15px;
    span {
      font-size: 12px;
      color: #858585;
    }
    strong {
      font-size: 36px;
      font-weight: bold;
    }
  }
`;

const UserInfo = ({ user }) => {
  return (
    <StyledUserInfo>
      <Avatar>
        <img src={user.avatar} alt="" />
      </Avatar>
      <h3>{user.username}</h3>
      <Stats>
        <div>
          <span>FOLLOWERS</span>
          <strong>{user.followers_count}</strong>
        </div>
        <div>
          <span>FOLLOWING</span>
          <strong>{user.following_count}</strong>
        </div>
        <div>
          <span>VOTES</span>
          <strong>{user.votes_count}</strong>
        </div>
      </Stats>
    </StyledUserInfo>
  );
};

export default UserInfo;
