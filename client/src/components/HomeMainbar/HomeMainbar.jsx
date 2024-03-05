import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useSelector } from 'react-redux'
import './HomeMainbar.css'
import QuestionList from './QuestionList'

const HomeMainbar = () => {

  const location = useLocation()
  const user = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate()

  const questionsList = useSelector((state)=>state.questionsReducer)

    const checkAuth = () => {
      if(user === null) {
        alert("login or signup to ask questions")
        navigate('/Auth')
      }else {
        navigate('/AskQuestion')
      }
    }


  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname === '/' ? <h1>Top Question</h1> : <h1>All Question</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Questions</button>
      </div>
      <div>
        {
          questionsList.data === null ?
          <p>Please be Petions server is down, it will take about max 1 min to up server</p> :
          <>
          <p>{questionsList.data.length} Questions</p>
          <QuestionList questionsList={questionsList.data}/>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
