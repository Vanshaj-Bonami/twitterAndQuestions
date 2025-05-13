import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home' 
import ProtectedLayout from './Components/ProtectedLayout'

function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App