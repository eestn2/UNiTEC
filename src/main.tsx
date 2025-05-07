import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './styles/index.css'
import App from './components/App'

import RegisterEnterprise from './components/session/RegisterEnterprise'
import RegisterUser from './components/session/RegisterUser'
//import FeedBox from './components/feed/FeedBox'
//import RegisterUser from './components/session/RegisterEnterprise'
//import Login from './components/session/Login'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
