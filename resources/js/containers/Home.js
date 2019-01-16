import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useStore } from 'easy-peasy';

// Components
import Post from '../components/Post/';
import Search from '../components/Search';
import { Container } from '../components/Container';
import { LinkButton } from '../components/Button';

const StyledHome = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const GuestHomepage = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  h1 {
    margin: 0 0 10px 0;
    font-size: 25px;
  }
  p {
    margin: 5px 0;
  }
  & > div {
    margin-top: 10px;
    display: flex;
    a {
      flex: 1;
      margin: 10px;
      display: flex;
      justify-content: center;
    }
  }
`;

const getFeed = accessToken => {
  return axios.get('/api/feed', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

const Home = () => {
  const { isAuthenticated, accessToken } = useStore(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      getFeed(accessToken)
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
    <StyledHome>
      <Fragment>
        {isAuthenticated ? (
          <Feed>
            {feed &&
              feed.map(post => (
                <Post
                  key={post.id}
                  post={{ ...post }}
                  deletePost={() =>
                    setModalState({ content: 'delete-post', show: true })
                  }
                  editPost={() =>
                    setModalState({ content: 'edit-post', show: true })
                  }
                />
              ))}
          </Feed>
        ) : (
          <Fragment>
            <Container style={{ paddingTop: '20px' }}>
              <Search />
            </Container>

            <GuestHomepage>
              <h1>Welcome to Photoify!</h1>
              <p>
                To fully enjoy this application you should login or create a new
                account.
              </p>
              <p>
                With Photoify you can share your life in pictures with friends
                and/or fans.
              </p>
              <div>
                <LinkButton to="/login">LOGIN</LinkButton>
                <LinkButton to="/register">REGISTER</LinkButton>
              </div>
            </GuestHomepage>
          </Fragment>
        )}
      </Fragment>
    </StyledHome>
  );
};

export default Home;
