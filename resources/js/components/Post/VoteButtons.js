import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useStore } from 'easy-peasy';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';

const StyledVote = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VoteButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  font-size: 35px;
  pointer-events: all;
  &:focus {
    outline: 0;
  }
`;

const Like = styled(VoteButton)`
  color: ${({ votedOn }) => (votedOn ? '#73C37B' : '#fff')};
`;

const Dislike = styled(VoteButton)`
  color: ${({ votedOn }) => (votedOn ? '#E36E6E' : '#fff')};
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
  const [myVote, setMyVote] = useState(post.my_vote);
  const [likes, setLikes] = useState(post.likes_count);
  const [dislikes, setDislikes] = useState(post.dislikes_count);
  return (
    <StyledVote>
      <Like
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
        <MdThumbUp />
      </Like>
      <Dislike
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
        <MdThumbDown />
      </Dislike>
    </StyledVote>
  );
};

export default Vote;
