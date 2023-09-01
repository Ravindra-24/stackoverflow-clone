
import { toast } from 'react-toastify'
import * as api from '../api'

export const askQuestion = (questionData, navigate,setProgress) => async(dispatch) => {
  try {
    setProgress(30)
    const {data} = await api.postQuestion(questionData)
    setProgress(50)
    dispatch({type: "POST_QUESTION", payload: data})
    setProgress(70)
    dispatch(fetchAllQuestions())
    toast.success('Question posted successfully')
    setProgress(100)
    navigate('/')
  } catch (error) {
    toast.error('Error posting question')
    console.log(error)
    setProgress(100)
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

export const deleteQuestion = (id, navigate, setProgress) => async(dispatch) => {
  try {
    setProgress(30)
     const {data} = api.deleteQuestion(id)
    setProgress(50)
    dispatch(fetchAllQuestions())
    setProgress(70)
    toast.success('Question deleted successfully')
    navigate('/')
    setProgress(100)
  } catch (error) {
    toast.error('Error deleting question')
    console.log(error )
    setProgress(100)
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

export const postAnswer = (answerData,setProgress) => async(dispatch) => {
  try {
      setProgress(30)
      const {id, noOfAnswers, answerBody, userAnswered, userId} = answerData
      const {data} = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId)
      setProgress(50)
      dispatch({type:'POST_ANSWER', payload: data})
      setProgress(70)
      dispatch(fetchAllQuestions())
      toast.success('Answer posted successfully')
      setProgress(100)
    } catch (error) {
      toast.error('Error posting answer')
      console.log(error)
      setProgress(100)
  }
}

export const deleteAnswer = (id, answerId, noOfAnswers, setProgress) => async(dispatch) => {
  try {
    setProgress(30)
    const {data} = await api.deleteAnswer(id, answerId, noOfAnswers)
    setProgress(50)
    dispatch(fetchAllQuestions())
    setProgress(70)
    toast.success('Answer deleted successfully')
    setProgress(100)
  } catch (error) {
    toast.error('Error deleting answer')
    console.log(error)
    setProgress(100)
  }
}