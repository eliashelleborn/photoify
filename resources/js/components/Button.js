import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  display: block;
  font-size: 16px;
  padding: 15px 20px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #fff;
  box-shadow: 0 3px 4px 1px rgba(167, 167, 167, 0.5);
  color: inherit;
  -webkit-tap-highlight-color: transparent;
  transition: 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 3px 0px rgba(167, 167, 167, 0.5);
    background-color: #fcfcfc;
  }
  &:focus {
    outline: none;
  }
`;
