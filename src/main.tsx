import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraBaseProvider } from '@chakra-ui/react';

import App from './App';
import theme from './theme';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraBaseProvider theme={theme}>
        <App />
      </ChakraBaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
