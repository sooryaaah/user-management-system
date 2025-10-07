import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login.jsx'
import Dashboard from './components/Dashboard.jsx'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/> } />
          <Route path='/' element={<Dashboard/> } />
          
        </Routes>
      </Router>
    </div>
  )
}

export default App