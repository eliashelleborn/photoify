import React from 'react';
import styled from 'styled-components';

const StyledVote = styled.div`
  display: flex;

  button {
    background: white;
    padding: 10px;
  }
`;

const StatBar = styled.div``;

const Vote = props => {
  return (
    <StyledVote>
      <button>Dislike</button>
      <StatBar>
        <span />
        <span />
      </StatBar>
      <button>Like</button>
    </StyledVote>
  );
};

export default Vote;
