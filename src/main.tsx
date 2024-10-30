import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import LayoutProvider from './contexts/LayoutProvider.tsx';
import { ThemeProvider } from './contexts/ThemeProvider.tsx';
import './index.css';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
