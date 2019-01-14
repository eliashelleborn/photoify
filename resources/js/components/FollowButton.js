import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useStore } from 'easy-peasy';

import { Button } from './Button';

const StyledFollowButton = styled(Button)``;

const FollowButton = ({ user }) => {
  const { accessToken } = useStore(state => state.auth);
  const [myFollow, setMyFollow] = useState(user.my_follow);
  return (
    <StyledFollowButton
      onClick={() => {
        if (myFollow) {
          axios
            .post(`/api/users/${user.id}/follow`, null, {
              headers: { Authorization: `Bearer ${accessToken}` },
              params: { _method: 'DELETE' }
            })
            .then(res => {
              setMyFollow(null);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          axios
            .post(`/api/users/${user.id}/follow`, null, {
              headers: { Authorization: `Bearer ${accessToken}` }
            })
            .then(res => {
              setMyFollow(res.data);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }}
    >
      {myFollow ? 'Following' : 'Follow'}
    </StyledFollowButton>
  );
};

export default FollowButton;
