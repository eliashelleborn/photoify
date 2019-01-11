import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { StoreProvider, useStore, useAction } from 'easy-peasy';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import ProtectedRoute from '../utils/ProtectedRoute';
import AuthenticationRoute from '../utils/AuthenticationRoute';
import store from '../store';

// Containers
import Home from './Home';
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Settings from './Settings';
import EditImage from './EditImage';

// Components
import Navbar from '../components/Navbar/index';

// FontAwesome library setup
library.add(faCamera);

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

  // Handle redirects (Take photo etc.)
  if (redirect) return <Redirect to={redirect} />;

  // Only render App content if Auth isnt loading
  return (
    <Router>
      {!authState.isLoading && (
        <div>
          <Navbar />

          {/* ===== ROUTES ===== */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/404" component={NotFound} />

            <AuthenticationRoute path="/login" component={Login} />
            <AuthenticationRoute path="/register" component={Register} />

            <ProtectedRoute path="edit-image" component={EditImage} />

            <ProtectedRoute path="/settings" component={Settings} />

            <Route path="/:username" component={Profile} />
          </Switch>
        </div>
      )}
    </Router>
  );
};

export default App;
