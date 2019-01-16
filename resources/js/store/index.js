import { createStore } from 'easy-peasy';
import authStore from './auth';
import notificationStore from './notifications';

const store = createStore({
  auth: authStore
  /* notifications: notificationStore */
});

export default store;
