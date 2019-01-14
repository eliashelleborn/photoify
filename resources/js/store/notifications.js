import axios from 'axios';
import { effect } from 'easy-peasy';
import Echo from 'laravel-echo';

const notificationStore = {
  notifications: [],
  isLoading: true,

  setNotifications: (state, payload) => {
    state.notifications = payload;
  },
  addNotification: (state, payload) => {
    state.notifications.push(payload);
  },
  setLoading: (state, payload) => {
    state.isLoading = payload;
  },

  getNotifications: effect(async (dispatch, payload, getState) => {
    const {
      auth: { authenticatedUser, accessToken }
    } = getState();
    const {
      notifications: { setNotifications }
    } = dispatch;
    axios
      .get(`/api/users/${authenticatedUser.id}/notifications`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => {
        setNotifications(res.data);
      });
  }),
  notificationsEventListener: effect(async (dispatch, payload, getState) => {
    const { auth } = getState();
    const {
      notifications: { addNotification }
    } = dispatch;

    if (auth.isAuthenticated) {
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        encrypted: true,
        auth: {
          headers: {
            Authorization: 'Bearer ' + auth.accessToken
          }
        }
      });

      window.Echo.private(`App.User.${auth.authenticatedUser.id}`).notification(
        notification => {
          addNotification(notification);
        }
      );
    } else {
      return null;
    }
  })
};

export default notificationStore;
