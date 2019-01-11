import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Field, Label } from '../components/Form';
import { Button } from '../components/Button';
import axios from 'axios';
import { useAction, useStore } from 'easy-peasy';

const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
    padding: 0 25px;

    & > * {
      width: 100%;
    }
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
      <h1>Register</h1>
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
          console.log(values);
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
        {({ isSubmitting, errors }) => (
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
            {errors.api && <p>{errors.api.message}</p>}
          </Form>
        )}
      </Formik>
    </StyledRegister>
  );
};

Register.propTypes = {};

export default Register;
