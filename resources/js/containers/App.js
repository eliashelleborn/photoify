import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { StoreProvider, useStore, useAction } from 'easy-peasy';

import ProtectedRoute from '../utils/ProtectedRoute';
import AuthenticationRoute from '../utils/AuthenticationRoute';
import store from '../store';
import Login from './Login';

const Home = () => {
  const auth = useStore(state => state.auth);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

const ProtectedPage = () => {
  const authenticatedUser = useStore(state => state.auth.authenticatedUser);
  return (
    <div>
      <h1>Protected Page</h1>
      <p>{authenticatedUser.email}</p>
      <p>{authenticatedUser.username}</p>
      <p>{authenticatedUser.name}</p>
    </div>
  );
};

const App = () => {
  const authState = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);

  // On app load
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    // Try getting authenticated user if access_token exists in localStorage
    if (!authState.isAuthenticated && access_token) {
      authActions.setToken(access_token);
      authActions.tokenAuthenticate();
    } else {
      // If no token was found, just set loading status to false
      authActions.setLoading(false);
    }
  }, []);

  // Only render App content if Auth isnt loading
  return (
    <Router>
      {!authState.isLoading && (
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/protected">Protected</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

          {authState.isAuthenticated && (
            <button onClick={() => authActions.logout()}>Logout</button>
          )}

          <Route path="/" exact component={Home} />
          <AuthenticationRoute path="/login" component={Login} />
          <ProtectedRoute path="/protected" component={ProtectedPage} />
        </div>
      )}
    </Router>
  );
};

export default App;
