import React from 'react';
import { useAction, useStore } from 'easy-peasy';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

import { Label, Field } from '../components/Form';
import { Button } from '../components/Button';

const StyledSettings = styled.div`
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

const SettingsSchema = Yup.object().shape({
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

const Settings = () => {
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  const setAuthenticatedUser = useAction(
    dispatch => dispatch.auth.setAuthenticatedUser
  );

  return (
    <StyledSettings>
      <h1>Settings</h1>

      <Formik
        initialValues={authenticatedUser}
        validationSchema={SettingsSchema}
        onSubmit={async (values, actions) => {
          const editedValues = Object.keys(values)
            .filter(key => values[key] !== authenticatedUser[key])
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
              console.log(res.data);
              actions.setStatus({ msg: 'Successfully saved!' });
              setAuthenticatedUser(res.data);
              actions.setSubmitting(false);
            } catch (error) {
              console.log(error);
              /* actions.setErrors({ api: res.data }); */
              actions.setSubmitting(false);
            }
          }
        }}
      >
        {({ isSubmitting, errors, status }) => (
          <Form>
            <Label name="username" />
            <Field type="text" name="username" />

            <Label name="email" />
            <Field type="email" name="email" />

            <Label name="biography" />
            <Field type="text" name="biography" />

            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
            {errors.api && <p>{errors.api.message}</p>}
            {status && status.msg && <p>{status.msg}</p>}
          </Form>
        )}
      </Formik>
    </StyledSettings>
  );
};

export default Settings;
