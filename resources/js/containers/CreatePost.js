import React, { useState, useRef, Fragment } from 'react';
import Cropper from 'react-cropper';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useStore } from 'easy-peasy';

// Components
import { Field, Label } from '../components/Form';
import CropImage from '../components/CropImage';
import { Container } from '../components/Container';
import { Button, LinkButton } from '../components/Button';

const StyledCreatePost = styled(Container)`
  padding-top: 20px;
  max-width: 400px;
`;

const CreatePost = props => {
  const authState = useStore(state => state.auth);
  const [croppedImage, setCroppedImage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const {
    state: { image }
  } = props.location;

  if (redirect || (!image && !croppedImage)) return <Redirect to="/" />;
  return (
    <StyledCreatePost>
      {!croppedImage && (
        <Fragment>
          <CropImage
            fromCreatePost={true}
            close={() => {
              const input = document.getElementById('photo-upload');
              input.value = '';
              if (!croppedImage) {
                setRedirect(true);
              }
            }}
            handleCroppedImage={data => {
              setCroppedImage(data);
              const input = document.getElementById('photo-upload');
              input.value = '';
            }}
            image={image}
          />
        </Fragment>
      )}

      <img style={{ maxWidth: '100%' }} src={croppedImage} alt="" />
      <Formik
        initialValues={{
          description: ''
        }}
        onSubmit={async (values, actions) => {
          try {
            // Get blob from url
            fetch(croppedImage)
              .then(res => res.blob())
              .then(blob => {
                // Send formData to endpoint
                const formData = new FormData();
                formData.append('image', blob);
                if (values.description !== '') {
                  formData.append('description', values.description);
                }
                axios
                  .post(`/api/posts/`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${authState.accessToken}`
                    }
                  })
                  .then(() => {
                    setRedirect(true);
                  });
              });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ status, errors }) => (
          <Form>
            <Field
              style={{ border: 'none' }}
              placeholder="Description..."
              type="text"
              name="description"
              component="textarea"
              rows="5"
            />
            <div style={{ display: 'flex' }}>
              <LinkButton to="/">Cancel</LinkButton>
              <Button type="submit">Create</Button>
            </div>
          </Form>
        )}
      </Formik>
    </StyledCreatePost>
  );
};

export default CreatePost;
