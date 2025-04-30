import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './styles/index.css'
import ChangePassword from './components/session/ChangePassword'
import ForgotPassword from './components/session/ForgotPassword'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ForgotPassword />
  </StrictMode>,
)
