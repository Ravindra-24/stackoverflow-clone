import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

export const AskQuestion = async (req, res)=> {
    const postQuestionData = req.body;
    const postQuestion = new Questions({...postQuestionData, userId:req.userId});
    try {
        await postQuestion.save();
        res.status(200).json("Posted a question successfully")
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't post a new question")
    }
}

export const getAllQuestions = async (req, res) => {
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const deleteQuestion = async (req, res) =>{
        const {id: _id} = req.params

        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('question unavailable...');
        }
        try {
            await Questions.findByIdAndRemove(_id)
            res.status(200).json({message: 'successfully deleted...'})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
}