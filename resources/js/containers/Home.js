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
      getFeed(authState.accessToken)
        .then(res => {
          setFeed(res.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.response);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return null;
  return (
    <Fragment>
      {authState.isAuthenticated && (
        <Feed>
          {feed && feed.map(post => <Post key={post.id} post={{ ...post }} />)}
        </Feed>
      )}
    </Fragment>
  );
};

export default Home;
