
import { toast } from 'react-toastify'
import * as api from '../api'

const setSafeProgress = (setProgress, value) => {
  if (typeof setProgress === "function") {
    setProgress(value);
  }
};

export const askQuestion = (questionData, navigate,setProgress) => async(dispatch) => {
  try {
    setSafeProgress(setProgress, 30)
    const {data} = await api.postQuestion(questionData)
    setSafeProgress(setProgress, 50)
    dispatch({type: "POST_QUESTION", payload: data})
    setSafeProgress(setProgress, 70)
    dispatch(fetchAllQuestions())
    toast.success('Question posted successfully')
    setSafeProgress(setProgress, 100)
    navigate('/')
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Error posting question')
    console.log(error)
    setSafeProgress(setProgress, 100)
  }
  
}


export const fetchAllQuestions = (params = {}) => async(dispatch) =>{
  try {
    const {data} = await api.getAllQuestions(params)
    const payload = Array.isArray(data)
      ? {
          items: data,
          total: data.length,
          page: 1,
          limit: data.length || 10,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
          filters: { q: "", tag: "", sort: "newest" },
        }
      : data;

    dispatch({ type:'FETCH_ALL_QUESTIONS', payload })
  } catch (error) {
    toast.error('Error fetching questions')
    console.log(error)
  }
}

export const fetchQuestionStats = () => async (dispatch) => {
  try {
    const { data } = await api.getQuestionStats();
    dispatch({ type: "FETCH_QUESTION_STATS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchQuestionById = async (id) => {
  const { data } = await api.getQuestionById(id);
  return data;
};

export const deleteQuestion = (id, navigate, setProgress) => async(dispatch) => {
  try {
    setSafeProgress(setProgress, 30)
    await api.deleteQuestion(id)
    setSafeProgress(setProgress, 50)
    dispatch(fetchAllQuestions())
    setSafeProgress(setProgress, 70)
    toast.success('Question deleted successfully')
    navigate('/')
    setSafeProgress(setProgress, 100)
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Error deleting question')
    console.log(error )
    setSafeProgress(setProgress, 100)
  }
}

export const voteQuestion = (id, value) => async(dispatch)=>{
  try {
    await api.voteQuestion(id, value)
    dispatch(fetchAllQuestions())
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Error voting')
    console.log(error)
  }
}

export const postAnswer = (answerData,setProgress) => async(dispatch) => {
  try {
      setSafeProgress(setProgress, 30)
      const {id, answerBody, userAnswered} = answerData
      const {data} = await api.postAnswer(id, answerBody, userAnswered)
      setSafeProgress(setProgress, 50)
      dispatch({type:'POST_ANSWER', payload: data})
      setSafeProgress(setProgress, 70)
      dispatch(fetchAllQuestions())
      toast.success('Answer posted successfully')
      setSafeProgress(setProgress, 100)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error posting answer')
      console.log(error)
      setSafeProgress(setProgress, 100)
  }
}

export const deleteAnswer = (id, answerId, setProgress) => async(dispatch) => {
  try {
    setSafeProgress(setProgress, 30)
    await api.deleteAnswer(id, answerId)
    setSafeProgress(setProgress, 50)
    dispatch(fetchAllQuestions())
    setSafeProgress(setProgress, 70)
    toast.success('Answer deleted successfully')
    setSafeProgress(setProgress, 100)
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Error deleting answer')
    console.log(error)
    setSafeProgress(setProgress, 100)
  }
}
