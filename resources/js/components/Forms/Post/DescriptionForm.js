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

const DescriptionSchema = Yup.object().shape({
  description: Yup.string().max(150, 'Too long (max 150)')
});

const DescriptionForm = ({ post, setPost }) => {
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);
  const initialValues = {
    description: post.description
  };

  return (
    <StyledUserInfoForm>
      <Formik
        initialValues={initialValues}
        validationSchema={DescriptionSchema}
        onSubmit={async (values, actions) => {
          if (values.description !== initialValues.description) {
            try {
              const res = await axios.post(`/api/posts/${post.id}`, values, {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { _method: 'PUT' }
              });
              actions.setStatus({ msg: 'Successfully saved!', color: 'green' });
              setPost(res.data);
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
            <Label name="description" />
            <Field type="text" name="description" />

            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>

            {status &&
              status.msg && <p style={{ color: status.color }}>{status.msg}</p>}

            {errors.api && (
              <ErrorBox>
                <ul>
                  {errors.api.errors.description &&
                    errors.api.errors.email.map((error, i) => (
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

export default DescriptionForm;
