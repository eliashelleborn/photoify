import React, { useState, useEffect, Fragment } from 'react';
import { useAction, useStore } from 'easy-peasy';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

import { Container } from '../components/Container';
import { Label, Field } from '../components/Form';
import { Button } from '../components/Button';
import ImageForm from '../components/Forms/Post/ImageForm';
import DescriptionForm from '../components/Forms/Post/DescriptionForm';
import DeletePostForm from '../components/Forms/Post/DeletePostForm';

const StyledEditPost = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 100px;

  h1 {
    margin: 0;
    margin-bottom: 20px;
  }

  form {
    width: 100%;
    display: flex;
    padding: 0;
    align-items: center;
    flex-direction: column;
  }
`;

const SectionHeader = styled.h2`
  padding: 15px 0;
  margin: 0;
  border-bottom: 1px solid grey;
  width: 100%;
`;

const EditPost = ({ location }) => {
  let params = new URLSearchParams(location.search);
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);
  const [redirect, setRedirect] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/posts/${params.get('post')}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => {
        if (res.data.user_id !== authenticatedUser.id) {
          setRedirect(true);
        } else {
          setPost(res.data);
        }
      })
      .catch(error => {
        setError(error.response);
        setLoading(false);
      });
  }, []);

  if (redirect) return <Redirect to="/" />;
  if (!post) return null;

  return (
    <StyledEditPost>
      <h1>Edit Post</h1>
      {post && (
        <Fragment>
          <SectionHeader>Image</SectionHeader>
          <ImageForm post={post} setPost={setPost} />

          <SectionHeader>Description</SectionHeader>
          <DescriptionForm post={post} setPost={setPost} />

          <SectionHeader>Delete Post</SectionHeader>
          <DeletePostForm post={post} redirect={() => setRedirect(true)} />
        </Fragment>
      )}
    </StyledEditPost>
  );
};

export default EditPost;
