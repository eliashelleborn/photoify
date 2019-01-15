import React, { useState } from 'react';
import { useAction, useStore } from 'easy-peasy';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form } from 'formik';

import { Label, Field } from '../../Form';
import { Button } from '../../Button';
import CropImage from '../../CropImage';

const StyledAvatarForm = styled.div`
  width: 100%;
`;

const ImageComparison = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    img {
      width: 100%;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 10px;
  label {
    input {
      display: none;
    }
  }
  label,
  button {
    padding: 10px;
    cursor: pointer;
    border: 1px solid lightgrey;
    border-radius: 3px;
    margin: 5px;
  }
`;

const AvatarForm = props => {
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);
  const [uncroppedImage, setUncroppedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropIsOpen, setCropIsOpen] = useState(false);
  return (
    <StyledAvatarForm>
      <ImageComparison>
        <div>
          <p>Current Image</p>
          <img src={authenticatedUser.avatar} alt="" />
        </div>

        <div>
          <p>New Image</p>
          <img
            src={
              croppedImage || 'https://via.placeholder.com/500?text=Placeholder'
            }
            alt=""
          />
        </div>
      </ImageComparison>

      <Buttons>
        <label>
          Choose new image
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              setUncroppedImage(URL.createObjectURL(e.target.files[0]));
              setCropIsOpen(true);
            }}
          />
        </label>

        <button
          onClick={() => {
            try {
              // Get blob from url
              fetch(croppedImage)
                .then(res => res.blob())
                .then(blob => {
                  // Send formData to endpoint
                  const formData = new FormData();
                  formData.append('avatar', blob);
                  axios
                    .post(
                      `/api/users/${authenticatedUser.id}/update_avatar`,
                      formData,
                      {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${accessToken}`
                        }
                      }
                    )
                    .then(res => {
                      authActions.setAuthenticatedUser(res.data);
                      setCroppedImage(null);
                    });
                });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Update Avatar
        </button>
      </Buttons>

      {uncroppedImage &&
        cropIsOpen && (
          <CropImage
            close={() => {
              setCropIsOpen(false);
            }}
            handleCroppedImage={data => {
              setCroppedImage(data);
              setCropIsOpen(false);
            }}
            image={uncroppedImage}
          />
        )}

      {/* <Formik
        initialValues={{ file: null }}
        validationSchema={Yup.object().shape({
          avatar: Yup.mixed().required()
        })}
        onSubmit={values => {
          try {
            const formData = new FormData();
            formData.append('avatar', croppedImage);
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
                setCropIsActive(true);
              }}
            />
            {values.avatar &&
              cropIsActive && (
                <CropImage
                  close={() => {
                    setFieldValue('avatar', null);
                    setCropIsActive(false);
                  }}
                  handleCroppedImage={data => {
                    setCroppedImage(data);
                    setFieldValue('avatar', null);
                  }}
                  image={URL.createObjectURL(values.avatar)}
                />
              )}
            {croppedImage && <img src={croppedImage} alt="" />}
            <button type="submit">Upload</button>
          </Form>
        )}
      </Formik> */}
    </StyledAvatarForm>
  );
};

export default AvatarForm;
