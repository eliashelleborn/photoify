import React, { useState } from 'react';
import styled from 'styled-components';

import MenuButton from './MenuButton';
import CircleButtons from './CircleButtons';
import Menu from './Menu';

const StyledMobileNavigation = styled.div`
  position: fixed;
`;

const MobileNavigation = props => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  return (
    <StyledMobileNavigation>
      <MenuButton
        menuIsOpen={menuIsOpen}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      />
      <CircleButtons menuIsOpen={menuIsOpen} />
      <Menu menuIsOpen={menuIsOpen} />
    </StyledMobileNavigation>
  );
};

export default MobileNavigation;
