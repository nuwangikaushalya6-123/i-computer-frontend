

import { Route, Routes } from 'react-router-dom'
import Admin from '../pages/admin'
import './App.css'
import Home from '../pages/home'
import Login from '../pages/login'
import ProductCard from './ProductCard'
import Test from './test'
import {Toaster }from "react-hot-toast"

function App() {


  return (
    <>
      <div className="w-full h-screen bg-primary text-secondary">
        <Toaster position="top-right"/>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test/>}/>
        </Routes>

      </div>
    </>
  )
}

export default App
