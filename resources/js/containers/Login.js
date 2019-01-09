import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Field, Label } from '../components/Form';
import { Button } from '../components/Button';
import axios from 'axios';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string().required('Required')
});

const Login = props => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect to="/" />;

  return (
    <StyledLogin>
      <h1>Login</h1>
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
              Submit
            </Button>
            {errors.api && <p>{errors.api.message}</p>}
          </Form>
        )}
      </Formik>
    </StyledLogin>
  );
};

Login.propTypes = {};

export default Login;
