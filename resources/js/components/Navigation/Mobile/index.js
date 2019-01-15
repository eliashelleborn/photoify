import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import MenuButton from './MenuButton';
import CircleButtons from './CircleButtons';
import Menu from './Menu';

const StyledMobileNavigation = styled.div`
  position: fixed;
  z-index: 500;
`;

const MobileNavigation = props => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <StyledMobileNavigation>
      <MenuButton
        menuIsOpen={menuIsOpen}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      />
      <CircleButtons
        closeMenu={() => setMenuIsOpen(false)}
        onUpload={e => {
          props.history.push({
            pathname: '/create-post',
            state: { image: URL.createObjectURL(e.target.files[0]) }
          });
          setMenuIsOpen(false);
        }}
        menuIsOpen={menuIsOpen}
      />
      <Menu closeMenu={() => setMenuIsOpen(false)} menuIsOpen={menuIsOpen} />
    </StyledMobileNavigation>
  );
};

export default withRouter(MobileNavigation);
