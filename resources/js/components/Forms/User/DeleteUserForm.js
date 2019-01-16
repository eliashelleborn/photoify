import React from 'react';
import { useAction, useStore } from 'easy-peasy';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form } from 'formik';

import { Label, Field } from '../../Form';
import { Button } from '../../Button';

const StyledDeleteUserForm = styled.div`
  width: 100%;
  p {
    margin: 5px 0;
  }
`;

const DeleteUserForm = props => {
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);
  return (
    <StyledDeleteUserForm>
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
              `/api/users/${authenticatedUser.id}`,
              {
                force_delete: true
              },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { _method: 'DELETE' }
              }
            );
            authActions.setAuthStatus(false);
            authActions.setToken(null);
            authActions.setAuthenticatedUser(null);
            localStorage.removeItem('access_token');
            actions.setSubmitting(false);
          } catch (error) {
            actions.setErrors({ api: res.data.message });
            actions.setSubmitting(false);
          }
        }}
      >
        <Form>
          <p>
            This action will delete your account and all data related to it.
          </p>
          <p>
            Provide your username and click "Delete Account" to go ahead with
            this action.
          </p>
          <Label name="username">Username</Label>
          <Field name="username" type="text" />

          <Button type="submit">Delete Account</Button>
        </Form>
      </Formik>
    </StyledDeleteUserForm>
  );
};

export default DeleteUserForm;
