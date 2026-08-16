import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Header.jsx'
import Content from './Content.jsx'
import Footer from './Footer.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Header />

    <Content />

    <Footer name="Contact" />
  </StrictMode>,
)
