import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { AppProvider } from './context/AppContext';

import lightTheme from './context/themes/light';
import darkTheme from './context/themes/dark';

import GlobalStyle from './styles/global';

import history from './services/history';
import Routes from './routes';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppProvider>
        <Router history={history}>
          <Routes />
          <ToastContainer />
        </Router>
      </AppProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
