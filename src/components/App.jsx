import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../firebase/firebase';
import AppRouter from '../routers/AppRouter';
import configureStore from '../store/configure';
import getVisibleTests from '../selectors/tests';

import '../styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  getVisibleTests(state.tests, state.filters);
  console.log(state);
});


const reduxProviderJSX = (
  <Provider store={store}>
    <MuiThemeProvider>
      <AppRouter />
    </MuiThemeProvider>
  </Provider>
);

const appRoot = document.getElementById('app');
ReactDOM.render(reduxProviderJSX, appRoot);
