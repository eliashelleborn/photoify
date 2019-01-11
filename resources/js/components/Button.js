import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  display: block;
  font-size: 18px;
  padding: 10px 15px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 10px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:focus {
    outline: none;
  }
`;
