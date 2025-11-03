import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Users from './components/Users.jsx'
import Employees from './pages/Employees.jsx'
import Tasks from './pages/Tasks.jsx'
import EmployeeDetail from './pages/EmployeeDetail.jsx'
import EmailVerification from './pages/EmailVerification.jsx'
import OtpVerification from './pages/OtpVerification.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { UserProvider } from './UserContext.jsx'

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
          <Route path='/employeedetail/:id' element = {<EmployeeDetail/> } />
          <Route path='/emailverification' element = {<EmailVerification/>} />
          <Route path='/otpverification' element = {<OtpVerification/>} />
          <Route path='/resetpassword' element = {<ResetPassword/>} />
          
          
          
        </Routes>
      </Router>
   
    </div>
  )
}

export default App