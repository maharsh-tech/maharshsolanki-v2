import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

function renderApp(profile) {
  document.title = (profile && (profile.displayName || profile.name)) || 'React App'
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App profile={profile} />
      </BrowserRouter>
    </React.StrictMode>,
  )
}

fetch('/me.json')
  .then((res) => res.json())
  .then((profile) => renderApp(profile))
  .catch(() => renderApp(null))