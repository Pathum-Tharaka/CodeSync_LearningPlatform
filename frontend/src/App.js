import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage'
import Authentication from './Components/Authentication/Authentication'

function App() {
  return (
    <div>
        <Routes>
          <Route path="/*" element={ true?<HomePage />: <Authentication />}>
          </Route>
        </Routes>
    </div>
  )
}

export default App
