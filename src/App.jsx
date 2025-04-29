import { Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Header from './components/header'
import Favorites from './components/favorites'
import './App.css'
import ProtectedHome from './components/ProtectedRoute/protectedRoute'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home"  element={  <Home /> } />    
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}

export default App
