import React, { useState } from 'react';
import { useAction, useStore } from 'easy-peasy';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik, Form } from 'formik';

import { Label, Field, ErrorBox } from '../../Form';
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
  margin-top: 10px;
  & > div {
    display: flex;
  }

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
    background-color: white;
  }
`;

const AvatarForm = props => {
  const { accessToken, authenticatedUser } = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);
  const [uncroppedImage, setUncroppedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropIsOpen, setCropIsOpen] = useState(false);
  const [error, setError] = useState(null);
  return (
    <StyledAvatarForm>
      <ImageComparison>
        <div>
          <p>Current Image</p>
          <img
            src={
              authenticatedUser.avatar ||
              'https://via.placeholder.com/500?text=Placeholder'
            }
            alt=""
          />
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
        <div>
          <label>
            Choose new image
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                console.log(e.target.files[0]);
                if (e.target.files[0].size <= 1000000) {
                  setUncroppedImage(URL.createObjectURL(e.target.files[0]));
                  setCropIsOpen(true);
                  setError(null);
                } else {
                  setError('Image file size is too big (Max 1mb)');
                }
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
                        authActions.setAuthenticatedUser({
                          ...authenticatedUser,
                          avatar: res.data.avatar
                        });
                        setCroppedImage(null);
                        setError(null);
                      });
                  });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Update Avatar
          </button>
        </div>
        <button
          onClick={() => {
            axios
              .post(`/api/users/${authenticatedUser.id}/remove_avatar`, null, {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              })
              .then(res => {
                authActions.setAuthenticatedUser({
                  ...authenticatedUser,
                  avatar: res.data.avatar
                });
                setCroppedImage(null);
                setError(null);
              });
          }}
        >
          Remove avatar
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

      {error && (
        <ErrorBox>
          <ul>
            <li>{error}</li>
          </ul>
        </ErrorBox>
      )}
    </StyledAvatarForm>
  );
};

export default AvatarForm;
