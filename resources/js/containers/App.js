import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from '../store';

const PageOne = () => <h1>Page One</h1>;
const PageTwo = () => <h1>Page Two</h1>;

const App = () => {
  return (
    <StoreProvider store={store}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/one">Page One</Link>
            </li>
            <li>
              <Link to="/two">Page Two</Link>
            </li>
          </ul>
          <Route path="/one" component={PageOne} />
          <Route path="/two" component={PageTwo} />
        </div>
      </Router>
    </StoreProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
