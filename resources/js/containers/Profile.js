import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useStore } from 'easy-peasy';

import Post from '../components/Post/';
import FollowButton from '../components/FollowButton';
import UserStats from '../components/UserStats';
import { Container } from '../components/Container';

const StyledProfile = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  margin-bottom: 15px;

  div:first-child {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  div:last-child {
    flex: 1;
    padding-left: 10px;
    h3 {
      margin: 0;
      font-size: 20px;
      margin-bottom: 5px;
    }
    p {
      font-size: 13px;
      margin: 0;
    }
  }
`;

const Feed = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 960px;
  width: 100%;

  @media screen and (min-width: 400px) {
    padding-top: 25px;
  }
`;

const Profile = ({ match }) => {
  const { accessToken, authenticatedUser, isAuthenticated } = useStore(
    state => state.auth
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/users/${match.params.username}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
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
    <StyledProfile>
      <UserInfo>
        <div>
          <img
            src={
              user.avatar ||
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }
            alt="User avatar"
          />
        </div>
        <div>
          <h3>{user.username}</h3>
          <p>{user.biography}</p>
        </div>
      </UserInfo>
      <UserStats
        following={user.following_count}
        followers={user.followers_count}
        votes={user.votes_count}
      />

      {isAuthenticated &&
        authenticatedUser.id !== user.id && <FollowButton user={user} />}

      <Feed>
        {posts.length > 0 &&
          posts.map(post => (
            <Post showUser={false} key={post.id} post={{ ...post }} />
          ))}
      </Feed>
      {posts.length === 0 && <p>This user havent posted anything yet</p>}
    </StyledProfile>
  );
};

export default Profile;
