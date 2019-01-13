import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useStore, useAction } from 'easy-peasy';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import SideNav from './SideNav';
import IconButton from './IconButton';
import PhotoButton from './PhotoButton';
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
  const [sideNavOpen, setSideNavOpen] = useState(false);

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
            {/* <UserButton avatar={authenticatedUser.avatar} /> */}
            <IconButton icon="search" />
          </Fragment>
        )}
        {!isAuthenticated && <Link to="/login">Login</Link>}

        <IconButton icon="bars" onClick={() => setSideNavOpen(!sideNavOpen)} />
      </Right>
      <SideNav isOpen={sideNavOpen} close={() => setSideNavOpen(false)} />
    </StyledNavbar>
  );
};

export default withRouter(Navbar);
