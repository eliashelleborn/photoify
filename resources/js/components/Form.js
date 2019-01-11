import React from 'react';
import { Field as BaseField, ErrorMessage } from 'formik';
import styled from 'styled-components';

export const Field = styled(BaseField)`
  display: block;
  font-size: 18px;
  padding: 7px 10px;
  border: 1px solid lightgrey;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
`;

const StyledLabel = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 15px;
  margin-bottom: 5px;

  & > label {
    text-transform: capitalize;
  }

  & > div {
    font-size: 12px;
    color: rebeccapurple;
    margin-left: auto;
  }
`;

export const Label = ({ children, name, withErrorMessage = true }) => {
  return (
    <StyledLabel>
      <label>{children || name}</label>
      {withErrorMessage && <ErrorMessage name={name} component="div" />}
    </StyledLabel>
  );
};
