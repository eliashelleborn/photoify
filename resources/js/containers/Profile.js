import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Post from '../components/Post/';
import { useStore } from 'easy-peasy';

const Feed = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = ({ match }) => {
  const { accessToken } = useStore(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/users/${match.params.username}`)
      .then(res => {
        setUser(res.data);
        axios
          .get(`/api/users/${res.data.id}/posts`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
          .then(res => {
            setPosts(res.data);
            setLoading(false);
          })
          .catch(error => {
            setError(error.response);
            setLoading(false);
          });
      })
      .catch(error => {
        setError(error.response);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (error && error.status === 404) return <Redirect to="/404" />;
  return (
    <div>
      <h1>Profile - {user.username}</h1>
      <Feed>
        {posts.map(post => (
          <Post showUser={false} key={post.id} post={{ ...post }} />
        ))}
      </Feed>
    </div>
  );
};

export default Profile;
