import React, { useState } from 'react';
import { useAction, useStore } from 'easy-peasy';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

import { Label, Field } from '../components/Form';
import { Button } from '../components/Button';
import Modal from '../components/Modal';

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

class Thumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      thumb: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <img
        src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    );
  }
}

const Settings = () => {
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  const [modalState, setModalState] = useState({
    isOpen: false,
    content: null
  });
  const authActions = useAction(dispatch => dispatch.auth);

  const initalValues = {
    username: authenticatedUser.username,
    email: authenticatedUser.email,
    name: authenticatedUser.name,
    biography: authenticatedUser.biography
  };

  return (
    <StyledSettings>
      <h1>Settings</h1>

      <Formik
        initialValues={{ file: null }}
        validationSchema={Yup.object().shape({
          avatar: Yup.mixed().required()
        })}
        onSubmit={values => {
          try {
            const formData = new FormData();
            formData.append('avatar', values.avatar);
            axios.post(
              `/api/users/${authenticatedUser.id}/update_avatar`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${accessToken}`
                }
              }
            );
          } catch (error) {}
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form>
            <input
              name="avatar"
              type="file"
              onChange={event => {
                setFieldValue('avatar', event.currentTarget.files[0]);
              }}
            />
            <Thumb file={values.avatar} />
            <button type="submit">Upload</button>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={initalValues}
        validationSchema={SettingsSchema}
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
            } catch (error) {
              actions.setErrors({ api: res.data.message });
              actions.setSubmitting(false);
            }
          } else {
            actions.setStatus({
              msg: 'You havent changed anything',
              color: 'blue'
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
            <Field type="text" name="biography" />

            <Button type="submit" disabled={isSubmitting}>
              Save
            </Button>
            {errors.api && <p>{errors.api.message}</p>}
            {status &&
              status.msg && <p style={{ color: status.color }}>{status.msg}</p>}
          </Form>
        )}
      </Formik>

      <br />

      <Button
        onClick={() => setModalState({ isOpen: true, content: 'soft-delete' })}
      >
        Soft Delete Account
      </Button>
      <Button
        onClick={() =>
          setModalState({ isOpen: true, content: 'permanent-delete' })
        }
      >
        Delete Account
      </Button>
      <Modal modalState={modalState} setModalState={setModalState}>
        {modalState.content === 'soft-delete' && <h1>Soft delete</h1>}
        {modalState.content === 'permanent-delete' && (
          <div>
            <h3>Soft Delete Account</h3>
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
                <Label name="username">Username</Label>
                <Field name="username" type="text" />
                <small>{authenticatedUser.username}</small>

                <Button type="submit">Delete</Button>
              </Form>
            </Formik>
          </div>
        )}
      </Modal>
    </StyledSettings>
  );
};

export default Settings;
