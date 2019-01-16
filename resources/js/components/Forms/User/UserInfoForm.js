import React from 'react';
import { useAction, useStore } from 'easy-peasy';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form } from 'formik';

import { Label, Field, ErrorBox } from '../../Form';
import { Button } from '../../Button';

const StyledUserInfoForm = styled.div`
  width: 100%;
`;

const UserInfoSchema = Yup.object().shape({
  username: Yup.string()
    .min(5)
    .max(32)
    .required('Required'),
  email: Yup.string()
    .email()
    .required(),
  biography: Yup.string()
    .max(150)
    .notRequired()
});

const UserInfoForm = props => {
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);
  const initalValues = {
    username: authenticatedUser.username,
    email: authenticatedUser.email,
    name: authenticatedUser.name,
    biography: authenticatedUser.biography
  };
  return (
    <StyledUserInfoForm>
      <Formik
        initialValues={initalValues}
        validationSchema={UserInfoSchema}
        onSubmit={async (values, actions) => {
          const editedValues = Object.keys(values)
            .filter(key => {
              if (key !== 'updated_at') {
                return values[key] !== initalValues[key];
              }
            })
            .reduce((obj, key) => {
              obj[key] = values[key];
              return obj;
            }, {});

          if (Object.keys(editedValues).length > 0) {
            try {
              const res = await axios.post(
                `/api/users/${authenticatedUser.id}`,
                editedValues,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                  params: { _method: 'PUT' }
                }
              );
              actions.setStatus({ msg: 'Successfully saved!', color: 'green' });
              authActions.setAuthenticatedUser(res.data);
              actions.setSubmitting(false);
            } catch ({ response: res }) {
              actions.setErrors({ api: res.data });
              actions.setStatus(null);
              actions.setSubmitting(false);
            }
          } else {
            actions.setStatus({
              msg: 'You havent changed anything',
              color: 'grey'
            });
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, status }) => (
          <Form>
            <Label name="username" />
            <Field type="text" name="username" />

            <Label name="email" />
            <Field type="email" name="email" />

            <Label name="name" />
            <Field type="text" name="name" />

            <Label name="biography" />
            <Field component="textarea" rows="5" type="text" name="biography" />

            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>

            {status &&
              status.msg && <p style={{ color: status.color }}>{status.msg}</p>}

            {errors.api && (
              <ErrorBox>
                <ul>
                  {errors.api.errors.email &&
                    errors.api.errors.email.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  {errors.api.errors.username &&
                    errors.api.errors.username.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                </ul>
              </ErrorBox>
            )}
          </Form>
        )}
      </Formik>
    </StyledUserInfoForm>
  );
};

export default UserInfoForm;
