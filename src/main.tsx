import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { App } from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { FavouriteCharacterProvider } from './contexts/FavouriteCharacterContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavouriteCharacterProvider>
      <App />
      <ToastContainer />
    </FavouriteCharacterProvider>
  </React.StrictMode>,
)
