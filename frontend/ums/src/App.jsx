import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Users from './components/Users.jsx'
import Employees from './pages/Employees.jsx'
import Tasks from './pages/Tasks.jsx'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/> } />
          <Route path='/' element={<Dashboard/> } />
          <Route path='/users' element={<Users/> } />
          <Route path='/employees' element={<Employees/>} />
          <Route path='/tasks' element={<Tasks/>} />
          
          
          
        </Routes>
      </Router>
    </div>
  )
}

export default App