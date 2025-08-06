import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store.tsx';
import { Provider } from 'react-redux';

import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { CookiesProvider } from 'react-cookie'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <CookiesProvider>
   <Provider store={store}>
          <App />
       </Provider>
   </CookiesProvider>
  </StrictMode>,
)
