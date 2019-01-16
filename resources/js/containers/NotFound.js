import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from '../components/Container';

const NotFound = () => {
  return (
    <Container>
      <h1>404</h1>
      <p>The thing you were looking for could not be found.</p>
      <Link to="/">Go Home</Link>
    </Container>
  );
};

export default NotFound;
