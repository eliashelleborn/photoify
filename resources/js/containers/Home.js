import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useStore } from 'easy-peasy';

// Components
import Post from '../components/Post/';
import { Container } from '../components/Container';

const Feed = styled.div`
  display: flex;
  flex-direction: column;
`;

const getFeed = accessToken => {
  return axios.get('/api/feed', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

const Home = () => {
  const authState = useStore(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feed, setFeed] = useState(null);
  useEffect(() => {
    if (authState.isAuthenticated) {
      axios
        .get(`/api/feed`, {
          headers: { Authorization: `Bearer ${authState.accessToken}` }
        })
        .then(res => {
          setFeed(res.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.response);
          setLoading(false);
        });
    }
  }, []);

  if (loading) console.log(loading);

  return (
    <Fragment>
      {authState.isAuthenticated && (
        <Feed>
          {feed && feed.map(post => <Post key={post.id} {...post} />)}
        </Feed>
      )}
    </Fragment>
  );
};

export default Home;
