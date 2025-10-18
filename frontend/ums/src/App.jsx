import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Users from './components/Users.jsx'
import Employees from './pages/Employees.jsx'
import Tasks from './pages/Tasks.jsx'
import EmployeeDetail from './pages/EmployeeDetail.jsx'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login/> } />
          <Route path='/dashboard' element={<Dashboard/> } />
          <Route path='/users' element={<Users/> } />
          <Route path='/employees' element={<Employees/>} />
          <Route path='/tasks' element={<Tasks/>} />
          <Route path='/employeedetail' element = {<EmployeeDetail/> } />
          
          
          
        </Routes>
      </Router>
    </div>
  )
}

export default App