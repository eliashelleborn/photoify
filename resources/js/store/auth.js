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

  tokenAuthenticate: effect(async (dispatch, payload, getState) => {
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
  }),
  logout: effect(async (dispatch, payload, getState) => {
    const {
      auth: { setAuthenticatedUser, setAuthStatus, setToken }
    } = dispatch;
    const accesstoken = getState().auth.accessToken;

    try {
      axios
        .post('/api/auth/logout', null, {
          headers: { Authorization: `Bearer ${accesstoken}` }
        })
        .then(res => {
          console.log(res.data.message);
        });
    } catch (error) {
      console.log(error);
    }

    setAuthStatus(false);
    setToken(null);
    setAuthenticatedUser(null);
    localStorage.removeItem('access_token');
  })
};

export default authStore;
