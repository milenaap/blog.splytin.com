import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './i18n';
import './styles/globals.css';
import './styles/styles.css';
import { App } from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import 'animate.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
