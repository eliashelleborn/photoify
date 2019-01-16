import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import { useStore } from 'easy-peasy';
import { Formik, Form } from 'formik';

import { Label, Field, ErrorBox } from '../../Form';
import { Button } from '../../Button';

const StyledChangePasswordForm = styled.div`
  width: 100%;
`;

const ChangePasswordSchema = Yup.object().shape({
  current_password: Yup.string().required('Required'),
  new_password: Yup.string().required('Required'),
  new_password_confirmation: Yup.string().required('Required')
});

const ChangePasswordForm = props => {
  const { authenticatedUser, accessToken } = useStore(state => state.auth);
  return (
    <StyledChangePasswordForm>
      <Formik
        initialValues={{
          current_password: '',
          new_password: '',
          new_password_confirmation: ''
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={async (values, actions) => {
          try {
            const res = await axios.post(
              `/api/users/${authenticatedUser.id}/change_password`,
              values,
              {
                headers: { Authorization: `Bearer ${accessToken}` }
              }
            );
            actions.setStatus({
              msg: 'Successfully changed password!',
              color: 'green'
            });
            actions.setSubmitting(false);
          } catch ({ response: res }) {
            actions.setErrors({ api: res.data });
            actions.setStatus(null);
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, status }) => (
          <Form>
            <Label name="current_password">Current Password</Label>
            <Field type="password" name="current_password" />

            <Label name="new_password">New Password</Label>
            <Field type="password" name="new_password" />

            <Label name="new_password_confirmation">Confirm New Password</Label>
            <Field type="password" name="new_password_confirmation" />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>

            {status &&
              status.msg && <p style={{ color: status.color }}>{status.msg}</p>}

            {errors.api && (
              <ErrorBox>
                <ul>
                  <li>{errors.api.message}</li>
                </ul>
              </ErrorBox>
            )}
          </Form>
        )}
      </Formik>
    </StyledChangePasswordForm>
  );
};

export default ChangePasswordForm;
