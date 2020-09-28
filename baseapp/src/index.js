import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter }  from 'react-router-dom';

import App from '../src/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from 'store';

/*material UI*/
import theme from '../src/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
