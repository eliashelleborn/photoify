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

const StyledLogin = styled(Container)`
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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required')
});

const Login = props => {
  const authActions = useAction(dispatch => dispatch.auth);
  const authState = useStore(state => state.auth);
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect to="/" />;

  return (
    <StyledLogin>
      <h1>LOGIN</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          try {
            const res = await axios.post('/api/auth/login', values);
            localStorage.setItem('access_token', res.data.access_token);
            authActions.setToken(res.data.access_token);
            authActions.setLoading(true);
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

            <Label name="password" />
            <Field type="password" name="password" />

            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>

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
    </StyledLogin>
  );
};

Login.propTypes = {};

export default Login;
