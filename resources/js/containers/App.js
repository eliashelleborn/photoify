import React, { useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { StoreProvider, useStore, useAction } from 'easy-peasy';

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
import CreatePost from './CreatePost';
import EditPost from './EditPost';

// Components
import MobileNavigation from '../components/Navigation/Mobile/';

const App = () => {
  const authState = useStore(state => state.auth);
  const authActions = useAction(dispatch => dispatch.auth);
  /*
  const { notificationsEventListener, getNotifications } = useAction(
    dispatch => dispatch.notifications
  );
  */
  // On app load
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    // Try getting authenticated user if access_token exists in localStorage
    if (!authState.isAuthenticated && access_token) {
      authActions.setToken(access_token);
      authActions.tokenAuthenticate().then(() => {
        // Get all notifications and initiate event listener
        /* getNotifications().then(() => {
          notificationsEventListener();
        }); */
      });
    } else {
      // If no token was found, just set loading status to false
      authActions.setLoading(false);
    }
  }, []);

  // Only render App content if Auth isnt loading
  return (
    <Router>
      {!authState.isLoading && (
        <Fragment>
          {/* <Navbar /> */}
          <MobileNavigation />

          {/* ===== ROUTES ===== */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/404" component={NotFound} />

            <AuthenticationRoute path="/login" component={Login} />
            <AuthenticationRoute path="/register" component={Register} />

            <ProtectedRoute path="/create-post" component={CreatePost} />
            <ProtectedRoute path="/edit-post" component={EditPost} />

            <ProtectedRoute path="/settings" component={Settings} />

            <Route path="/:username" component={Profile} />
          </Switch>
        </Fragment>
      )}
    </Router>
  );
};

export default App;
