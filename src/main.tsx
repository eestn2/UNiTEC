import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './styles/index.css'
import FeedBox from './components/feed/FeedBox'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FeedBox />
  </StrictMode>,
)
