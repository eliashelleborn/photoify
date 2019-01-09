import axios from 'axios';
import { effect } from 'easy-peasy';

const authStore = {
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  authenticatedUser: null,

  setLoading: (state, payload) => {
    state.isLoading = payload;
  },
  setAuthStatus: (state, payload) => {
    state.isAuthenticated = payload;
  },
  setToken: (state, payload) => {
    state.accessToken = payload;
  },
  setAuthenticatedUser: (state, payload) => {
    state.authenticatedUser = payload;
  },
  logout: state => {
    state.isAuthenticated = false;
    state.accessToken = null;
    state.authenticatedUser = null;
    localStorage.removeItem('access_token');
  },

  tokenAuthenticate: effect(async (dispatch, payload, getState) => {
    console.log('Token Authenticate');
    const {
      auth: { setAuthenticatedUser, setAuthStatus, setLoading }
    } = dispatch;
    try {
      const accesstoken = getState().auth.accessToken;
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${accesstoken}` }
      });
      setAuthenticatedUser(res.data);
      setAuthStatus(true);
      setLoading(false);
    } catch (e) {
      localStorage.removeItem('access_token');
      dispatch.auth.setToken(null);
      setLoading(false);
    }
  })
};

export default authStore;
