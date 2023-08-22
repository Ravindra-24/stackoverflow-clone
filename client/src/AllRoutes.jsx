import React, { useEffect, useState } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'
import LoadingBar from 'react-top-loading-bar'
import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import Questions from './Pages/Questions/Questions'
import AskQuestion from './Pages/AskQuestion/AskQuestion'
import DisplayQuestion from './Pages/Questions/DisplayQuestion'
import Tags from './Pages/Tags/Tags'
import Users from './Pages/Users/Users'
import UserProfile from './Pages/UserProfile/UserProfile'

const AllRoutes = () => {
  const [progress, setProgress] = useState(0)
const location = useLocation()
  useEffect(() => {
    setProgress(40)
    const timeout = setTimeout(() => {
      setProgress(100)
    }, 400)
    return () => clearTimeout(timeout)
  }, [location.pathname])
  return (
    <>
    <ToastContainer/>
        <LoadingBar
          // className="loading-bar"
          color="#009dff"
          height={4}
          shadow={true}
          progress={progress}
          loaderSpeed={500}
          containerStyle={{ zIndex: 1000 }}
          transitionTime={200}
          waitingTime={500}
          onLoaderFinished={() => setProgress(0)}
        />
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/Questions' element={<Questions/>}/>
        <Route path='/AskQuestion' element={<AskQuestion/>}/>
        <Route path='/Questions/:id' element={<DisplayQuestion/>}/>
        <Route path='/Tags' element={<Tags/>}/>
        <Route path='/Users' element={<Users/>}/>
        <Route path='/Users/:id' element={<UserProfile/>}/>
    </Routes>
    </>
  )
}

export default AllRoutes
