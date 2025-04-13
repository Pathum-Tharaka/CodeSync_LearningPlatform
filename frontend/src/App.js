import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage'
import Authentication from './Components/Authentication/Authentication'


function App() {
  return (
    <div>
        <Routes>
          <Route path="/*" element={ false?<HomePage />: <Authentication />}>/// This will be the default route for the app controller false and true
          </Route>
        </Routes>
    </div>
  )
}

export default App
