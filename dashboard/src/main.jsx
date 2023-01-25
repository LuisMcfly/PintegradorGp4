import React from 'react'
import ReactDOM from 'react-dom/client'
//import './styles.css'
import { Dashboard } from './Dashboard'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>
  //</React.StrictMode>,
)
