import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './styles/index.css'
import App from './components/App'
import FeedBox from './components/feed/FeedBox'
import RegisterUser from './components/session/RegisterUser'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RegisterUser />
  </StrictMode>,
)
