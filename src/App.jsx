

import { Route, Routes } from 'react-router-dom'
import Admin from '../pages/admin'
import './App.css'
import Home from '../pages/home'
import Login from '../pages/login'
import ProductCard from './ProductCard'
import Test from './test'
import {Toaster }from "react-hot-toast"
import RegisterPage from '../pages/register'
import ForgetPassword from '../pages/forgetPassword'
import { GoogleOAuthProvider } from '@react-oauth/google';

// 824331045123-hhhnl5pfka8qj71scnku38tj2kepevgn.apps.googleusercontent.com

function App() {


  return (
    
    <GoogleOAuthProvider clientId="824331045123-hhhnl5pfka8qj71scnku38tj2kepevgn.apps.googleusercontent.com">
      <div className="w-full h-screen bg-primary text-secondary">
        <Toaster position="top-right"/>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/test" element={<Test/>}/>
        </Routes>

      </div>
    
    </GoogleOAuthProvider>
  )
}

export default App
