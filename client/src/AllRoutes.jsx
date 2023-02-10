import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import Questions from './Pages/Questions/Questions'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/Questions' element={<Questions/>}/>
    </Routes>
  )
}

export default AllRoutes
