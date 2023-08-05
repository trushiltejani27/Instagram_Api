import React from 'react'
import { Routes, Route } from "react-router-dom"
import User from './Component/User'
import Profile from './Component/Profile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/Profile/:id/:name" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
