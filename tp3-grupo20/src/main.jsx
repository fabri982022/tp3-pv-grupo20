import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App  from './App.jsx'
import './index.css'
import './css/proyectos.css'
import { UsuarioProvider } from './context/UsuarioContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioProvider>
      <App />
    </UsuarioProvider>
  </StrictMode>,
)