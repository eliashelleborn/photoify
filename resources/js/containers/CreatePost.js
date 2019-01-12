import React, { useState, useRef, Fragment } from 'react';
import Cropper from 'react-cropper';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useStore } from 'easy-peasy';

// Components
import { Field, Label } from '../components/Form';

const CreatePost = props => {
  const authState = useStore(state => state.auth);
  const [stage, setStage] = useState('crop');
  const [croppedImage, setCroppedImage] = useState(null);
  const cropper = useRef(null);
  const {
    state: { image }
  } = props.location;
  return (
    <Fragment>
      {stage === 'crop' && (
        <Fragment>
          <Cropper
            ref={cropper}
            src={image}
            style={{
              width: '100vw',
              maxHeight: 'calc(100vh - 51px)'
            }}
            dragMode="move"
            aspectRatio={1 / 1}
          />
          <button
            onClick={() => {
              setCroppedImage(cropper.current.getCroppedCanvas().toDataURL());
              setStage('text');
            }}
          >
            Done
          </button>
        </Fragment>
      )}
      {stage === 'text' && (
        <Fragment>
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
                    axios.post(`/api/posts/`, formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authState.accessToken}`
                      }
                    });
                  });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ status, errors }) => (
              <Form>
                <Label name="description" />
                <Field type="text" name="description" />
                <button type="submit">Done</button>
              </Form>
            )}
          </Formik>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreatePost;
