import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.div`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  padding-bottom: ${props => props.width || '100%'};
  position: relative;
  pointer-events: fill;
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

const Img = ({ width, height, src, alt }) => {
  return (
    <StyledImg width={width} height={height}>
      <img src={src} alt={alt} />
    </StyledImg>
  );
};

export default Img;
