import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeProvider.tsx';
import LayoutProvider from './contexts/LayoutProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <LayoutProvider>
          <RouterProvider router={router} />
        </LayoutProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
