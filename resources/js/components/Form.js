import React from 'react';
import { Field as BaseField, ErrorMessage } from 'formik';
import styled from 'styled-components';

export const Field = styled(BaseField)`
  display: block;
  font-size: 18px;
  padding: 7px 10px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  width: 100%;
  max-width: 500px;

  &:focus {
    outline: none;
  }
`;

const StyledLabel = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 100%;
  max-width: 500px;

  & > label {
    text-transform: capitalize;
  }

  & > div {
    font-size: 12px;
    color: rebeccapurple;
    margin-left: auto;
  }
`;

export const ErrorBox = styled.div`
  margin-top: 10px;
  padding: 20px;
  background-color: #e36e6e;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
  }
`;

// Example ErrorBox content
// <ul>
//   {errors.api.errors.email &&
//     errors.api.errors.email.map((error, i) => <li key={i}>{error}</li>)}
//   {errors.api.errors.username &&
//     errors.api.errors.username.map((error, i) => <li key={i}>{error}</li>)}
// </ul>

export const Label = ({ children, name, withErrorMessage = true }) => {
  return (
    <StyledLabel>
      <label>{children || name}</label>
      {withErrorMessage && <ErrorMessage name={name} component="div" />}
    </StyledLabel>
  );
};
