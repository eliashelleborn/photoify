import React from 'react';
import styled from 'styled-components';

const StyledUserStats = styled.div`
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
const UserStats = ({ followers, following, votes }) => {
  return (
    <StyledUserStats>
      <div>
        <span>FOLLOWERS</span>
        <strong>{followers}</strong>
      </div>
      <div>
        <span>FOLLOWING</span>
        <strong>{following}</strong>
      </div>
      <div>
        <span>VOTES</span>
        <strong>{votes}</strong>
      </div>
    </StyledUserStats>
  );
};

export default UserStats;
