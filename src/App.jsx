import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Edit from './pages/Edit';
import Create from './pages/Create';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login"/>} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register"element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/edit" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  )
}

export default App