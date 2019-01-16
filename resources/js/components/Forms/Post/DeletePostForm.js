import React from 'react';
import { useAction, useStore } from 'easy-peasy';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form } from 'formik';

import { Label, Field } from '../../Form';
import { Button } from '../../Button';

const StyledDeletePostForm = styled.div`
  width: 100%;
  p {
    margin: 5px 0;
  }
`;

const DeletePostForm = ({ post, redirect }) => {
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  return (
    <StyledDeletePostForm>
      <Formik
        initialValues={{
          username: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required('Required')
            .test('is-username', 'Incorrect username', value => {
              return value === authenticatedUser.username;
            })
        })}
        onSubmit={async (values, actions) => {
          try {
            const res = await axios.post(
              `/api/posts/${post.id}`,
              {
                force_delete: true
              },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { _method: 'DELETE' }
              }
            );
            actions.setSubmitting(false);
            redirect();
          } catch (error) {
            actions.setErrors({ api: res.data.message });
            actions.setSubmitting(false);
          }
        }}
      >
        <Form>
          <p>This action will delete this post and all related data.</p>
          <p>
            Provide your username and click "Delete Post" to go ahead with this
            action.
          </p>
          <Label name="username">Username</Label>
          <Field name="username" type="text" />

          <Button type="submit">Delete Post</Button>
        </Form>
      </Formik>
    </StyledDeletePostForm>
  );
};

export default DeletePostForm;
