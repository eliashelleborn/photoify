import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAction, useStore } from 'easy-peasy';

import { Field, Label, ErrorBox } from '../components/Form';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

const StyledRegister = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 0;
  }

  form {
    width: 100%;
    display: flex;
    padding: 0 20px;
    align-items: center;
    flex-direction: column;
  }
`;

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  username: Yup.string()
    .min(5, 'Too short (min 5)')
    .max(32, 'Too long (max 32)')
    .required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Required'),
  name: Yup.string().required('Required')
});

const Register = props => {
  const authActions = useAction(dispatch => dispatch.auth);
  const authState = useStore(state => state.auth);
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect to="/" />;

  return (
    <StyledRegister>
      <h1>REGISTER</h1>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          name: ''
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, actions) => {
          try {
            const res = await axios.post('/api/auth/register', values);
            localStorage.setItem('access_token', res.data.access_token);
            authActions.setToken(res.data.access_token);
            authActions.tokenAuthenticate();
            setRedirect(true);
          } catch ({ response: res }) {
            actions.setErrors({ api: res.data });
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => {
          return (
            <Form>
              <Label name="email" />
              <Field type="email" name="email" />

              <Label name="username" />
              <Field type="text" name="username" />

              <Label name="password" />
              <Field type="password" name="password" />

              <Label name="confirmPassword">Confirm password</Label>
              <Field type="password" name="confirmPassword" />

              <Label name="name" />
              <Field type="text" name="name" />

              <Button type="submit" disabled={isSubmitting}>
                Register
              </Button>

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
          );
        }}
      </Formik>
    </StyledRegister>
  );
};

Register.propTypes = {};

export default Register;
