import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useStore, useAction } from 'easy-peasy';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import PhotoButton from './PhotoButton';
import BurgerButton from './BurgerButton';
import UserButton from './UserButton';

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 7px;
  font-size: 27px;
  background-color: #fff;
  z-index: 100;
`;

const Left = styled.div`
  margin-right: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Navbar = props => {
  const { authenticatedUser, isAuthenticated } = useStore(state => state.auth);
  const logout = useAction(dispatch => dispatch.auth.logout);

  return (
    <StyledNavbar>
      <Left>
        {isAuthenticated && (
          <Fragment>
            <PhotoButton
              onUpload={e =>
                props.history.push({
                  pathname: '/create-post',
                  state: { image: URL.createObjectURL(e.target.files[0]) }
                })
              }
            />
          </Fragment>
        )}
      </Left>
      <Right>
        {isAuthenticated && (
          <Fragment>
            <UserButton avatar={authenticatedUser.avatar} />
            <BurgerButton />
          </Fragment>
        )}
      </Right>
    </StyledNavbar>
  );
};

export default withRouter(Navbar);
