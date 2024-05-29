import React from 'react'
import {Route, Routes, Link} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Job from './Pages/Jobs/Job'
import NotFound from './Pages/Login/NotFound'
import ProtectedRouter from './Pages/Login/ProtectedRouter'
import Jobdetails from './Pages/Jobdetails/Jobdetails'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<ProtectedRouter Component={Home}/> }></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/jobs' element={<ProtectedRouter Component={Job}/>}></Route>
      <Route path='/jobs/:id' element={<ProtectedRouter Component={Jobdetails}/>}></Route>
      <Route path='/*' element={<NotFound/>} ></Route>
    </Routes>
    </>
  )
}

export default App