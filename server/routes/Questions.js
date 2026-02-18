import express from 'express'

import {
    AskQuestion,
    getAllQuestions,
    getQuestionById,
    deleteQuestion,
    voteQuestion,
    getQuestionStats,
} from '../controllers/Questions.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/Ask',auth, AskQuestion)
router.get('/stats', getQuestionStats)
router.get('/get', getAllQuestions) 
router.get('/get/:id', getQuestionById)
router.delete('/delete/:id',auth, deleteQuestion)
router.patch('/vote/:id',auth, voteQuestion)

export default router
