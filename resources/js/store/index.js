import { createStore } from 'easy-peasy';
import authStore from './auth';

const store = createStore({
  auth: authStore
});

export default store;
