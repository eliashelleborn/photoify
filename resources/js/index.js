import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import 'cropperjs/dist/cropper.css';

import store from './store/index';
import App from './containers/App';

const Index = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
