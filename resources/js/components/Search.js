import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const SearchInput = styled.div`
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

const SearchResult = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 54px;
  width: 100%;
  box-shadow: 0 3px 4px 1px rgba(167, 167, 167, 0.5);
  background-color: #fff;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
`;

const ResultHeader = styled.div`
  padding: 5px;
  background-color: #eeeeee;
`;

const UserResults = styled.div`
  & > a {
    text-decoration: none;
    color: inherit;
    display: flex;
    padding: 20px;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
    p {
      margin: 0;
      font-weight: bold;
    }
  }
`;

const Search = props => {
  const [userSearchResult, setUserSearchResult] = useState(null);
  return (
    <StyledSearch>
      <SearchInput>
        <input
          type="text"
          placeholder="Search"
          onChange={e => {
            if (e.target.value.length > 0) {
              axios
                .get(`/api/users/search?limit=5&query=${e.target.value}`)
                .then(res => {
                  setUserSearchResult(res.data);
                  console.log(res.data);
                });
            } else {
              setUserSearchResult(null);
            }
          }}
        />
        <MdSearch />
      </SearchInput>
      {userSearchResult && (
        <SearchResult>
          <Fragment>
            <ResultHeader>Users</ResultHeader>
            <UserResults>
              {userSearchResult.map(item => (
                <Link to={`/${item.username}`}>
                  <img src={item.avatar} alt="" />
                  <p>{item.username}</p>
                </Link>
              ))}
            </UserResults>
          </Fragment>
        </SearchResult>
      )}
    </StyledSearch>
  );
};

export default Search;
