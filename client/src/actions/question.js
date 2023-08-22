
import { toast } from 'react-toastify'
import * as api from '../api'

export const askQuestion = (questionData, navigate) => async(dispatch) => {
  try {
    const {data} = await api.postQuestion(questionData)
    dispatch({type: "POST_QUESTION", payload: data})
    dispatch(fetchAllQuestions())
    toast.success('Question posted successfully')
    navigate('/')
  } catch (error) {
    toast.error('Error posting question')
    console.log(error)
  }
  
}


export const fetchAllQuestions = () => async(dispatch) =>{
  try {
    const {data} = await api.getAllQuestions()
    dispatch({ type:'FETCH_ALL_QUESTIONS', payload: data })
  } catch (error) {
    toast.error('Error fetching questions')
    console.log(error)
  }
}

export const deleteQuestion = (id, navigate) => async(dispatch) => {
  try {
     const {data} = api.deleteQuestion(id)
    dispatch(fetchAllQuestions())
    toast.success('Question deleted successfully')
    navigate('/')
  } catch (error) {
    toast.error('Error deleting question')
    console.log(error )
  }
}

export const voteQuestion = (id, Value, userId) => async(dispatch)=>{
  try {
    const {data}= await api.voteQuestion(id, Value, userId)
    dispatch(fetchAllQuestions())
    toast.success('Voted successfully')
  } catch (error) {
    toast.error('Error voting')
    console.log(error)
  }
}

export const postAnswer = (answerData) => async(dispatch) => {
  try {
      const {id, noOfAnswers, answerBody, userAnswered, userId} = answerData
      const {data} = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId)
      dispatch({type:'POST_ANSWER', payload: data})
      dispatch(fetchAllQuestions())
      toast.success('Answer posted successfully')
    } catch (error) {
      toast.error('Error posting answer')
      console.log(error)
  }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async(dispatch) => {
  try {
    const {data} = await api.deleteAnswer(id, answerId, noOfAnswers)
    dispatch(fetchAllQuestions())
    toast.success('Answer deleted successfully')
  } catch (error) {
    toast.error('Error deleting answer')
    console.log(error)
  }
}