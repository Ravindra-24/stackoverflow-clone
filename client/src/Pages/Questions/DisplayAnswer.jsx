import React from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import {deleteAnswer} from '../../actions/question'

const DisplayAnswer = ({question, handleShare, setProgress}) => {

  const User = useSelector((state) => (state.currentUserReducer))
  const dispatch = useDispatch()
  const { id} = useParams()
  const handleDelete = (answerId) => {
    dispatch(deleteAnswer(id, answerId, setProgress))
  }
  return (
    <div>
      {
        question.answer.map((ans)=>(
            <div className="display-ans" key={ans._id}>
                <p>{ans.answerBody}</p>
                <div className="question-actions-user">
                    <div>
                        <button type='button' onClick={handleShare}>Share</button>
                        {
                             (User?.result?._id === ans?.userId || User?.result?._id === question?.userId) && (
                             <button type='button' onClick={()=>handleDelete(ans._id)}>Delete</button>
                             ) 
                        }
                    </div>
                    <div>
                        <p>answered {moment(ans.answeredOn).fromNow()}</p>
                        <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                            <Avatar backgroundColor="green" px='8px' py='5px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                            <div>{ans.userAnswered}</div>
                                        </Link>
                    </div>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default DisplayAnswer
