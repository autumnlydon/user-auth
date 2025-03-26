import Signup from './Signup'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Homepage from './Homepage'
import Dashboard from './Dashboard'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
