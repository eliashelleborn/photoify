import React, { useState } from 'react';
import { useAction, useStore } from 'easy-peasy';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

import { Container } from '../components/Container';
import { Label, Field } from '../components/Form';
import { Button } from '../components/Button';
import AvatarForm from '../components/Forms/User/AvatarForm';
import UserInfoForm from '../components/Forms/User/UserInfoForm';
import ChangePasswordForm from '../components/Forms/User/ChangePasswordForm';
import DeleteUserForm from '../components/Forms/User/DeleteUserForm';

const StyledSettings = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 100px;

  h1 {
    margin: 0;
    margin-bottom: 20px;
  }

  form {
    width: 100%;
    display: flex;
    padding: 0;
    align-items: center;
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

const SectionHeader = styled.h2`
  padding: 20px 0;
  margin: 0;
  border-bottom: 1px solid grey;
  width: 100%;
`;

const Settings = () => {
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);

  return (
    <StyledSettings>
      <h1>Settings - {authenticatedUser.username}</h1>

      <SectionHeader>Avatar</SectionHeader>
      <AvatarForm />

      <SectionHeader>Info</SectionHeader>
      <UserInfoForm />

      <SectionHeader>Change Password</SectionHeader>
      <ChangePasswordForm />

      <SectionHeader>Danger Zone</SectionHeader>
      <DeleteUserForm />
    </StyledSettings>
  );
};

export default Settings;
