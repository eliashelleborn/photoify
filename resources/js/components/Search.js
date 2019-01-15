import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

const StyledSearch = styled.div`
  width: 100%;
  height: 56px;
  position: relative;
  input {
    height: 56px;
    width: 100%;
    border: none;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 3px 4px 1px rgba(167, 167, 167, 0.5);
    padding: 0 65px 0 20px;
    font-size: 20px;
    &:focus {
      outline: none;
    }
  }
  svg {
    position: absolute;
    font-size: 40px;
    top: 9px;
    right: 10px;
    color: #282828;
  }
`;

const Search = props => {
  return (
    <StyledSearch>
      <input type="text" placeholder="Search" />
      <MdSearch />
    </StyledSearch>
  );
};

export default Search;
