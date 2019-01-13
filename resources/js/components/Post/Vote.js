import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useStore } from 'easy-peasy';

const StyledVote = styled.div`
  display: flex;
`;

const StatBar = styled.div``;

const VoteButton = styled.button`
  background-color: ${props => (props.votedOn ? 'blue' : 'white')};
  padding: 10px;
`;

const postVote = (postId, voteType, accessToken) => {
  return axios.post(
    `/api/posts/${postId}/votes`,
    { type: voteType },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
};

const removeVote = (postId, accessToken) => {
  return axios.post(`/api/posts/${postId}/votes`, null, {
    headers: { Authorization: `Bearer ${accessToken} ` },
    params: { _method: 'DELETE' }
  });
};

const Vote = ({ post }) => {
  const accessToken = useStore(state => state.auth.accessToken);
  const [myVote, setMyVote] = useState(post.votes[0]);
  const [likes, setLikes] = useState(parseInt(post.likes));
  const [dislikes, setDislikes] = useState(parseInt(post.dislikes));

  return (
    <StyledVote>
      <p>My Vote: {myVote && myVote.type}</p>
      <VoteButton
        votedOn={myVote && myVote.type === 'like'}
        onClick={() => {
          if (myVote && myVote.type === 'like') {
            removeVote(post.id, accessToken).then(res => {
              setMyVote(null);
              setLikes(likes - 1);
            });
          } else {
            postVote(post.id, 'like', accessToken).then(res => {
              if (myVote && myVote.type === 'dislike') {
                setDislikes(dislikes - 1);
              }
              setMyVote(res.data);
              setLikes(likes + 1);
            });
          }
        }}
      >
        Like
      </VoteButton>
      <StatBar>
        <span>likes {likes}</span>
        <span>dislikes {dislikes}</span>
      </StatBar>
      <VoteButton
        votedOn={myVote && myVote.type === 'dislike'}
        onClick={() => {
          if (myVote && myVote.type === 'dislike') {
            removeVote(post.id, accessToken).then(res => {
              setMyVote(null);
              setDislikes(dislikes - 1);
            });
          } else {
            postVote(post.id, 'dislike', accessToken).then(res => {
              if (myVote && myVote.type === 'like') {
                setLikes(likes - 1);
              }
              setMyVote(res.data);
              setDislikes(dislikes + 1);
            });
          }
        }}
      >
        Dislike
      </VoteButton>
    </StyledVote>
  );
};

export default Vote;
