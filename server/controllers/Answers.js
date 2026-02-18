import mongoose from "mongoose";
import Questions from '../models/Questions.js'

export const postAnswer = async(req, res)=>{
    const {id: _id} = req.params;
    const {answerBody, userAnswered} = req.body;
    const userId = req.userId;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...');
    }

    if (!answerBody?.trim()) {
        return res.status(400).json({ message: "Answer body is required" });
    }

    try {
        const question = await Questions.findById(_id);
        if (!question) {
            return res.status(404).json({ message: "Question unavailable..." });
        }

        question.answer.push({
            answerBody: answerBody.trim(),
            userAnswered: String(userAnswered || "Anonymous").trim(),
            userId,
        });
        question.noOfAnswers = question.answer.length;

        await question.save();
        const updatedQuestion = await Questions.findById(_id);
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json({ message: "Could not post answer" })
    }
}

export const deleteAnswer = async(req, res) =>{
 const {id: _id} = req.params;
 const {answerId} = req.body;
 
 if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send('Question unavailable...');
}
if(!mongoose.Types.ObjectId.isValid(answerId)){
    return res.status(404).send('Answer unavailable...');
}
try {
    const question = await Questions.findById(_id);
    if (!question) {
        return res.status(404).json({ message: "Question unavailable..." });
    }

    const answerToDelete = question.answer.id(answerId);
    if (!answerToDelete) {
        return res.status(404).json({ message: "Answer unavailable..." });
    }

    if (answerToDelete.userId !== req.userId && question.userId !== req.userId) {
        return res.status(403).json({ message: "You are not allowed to delete this answer" });
    }

    question.answer = question.answer.filter((ans) => String(ans._id) !== String(answerId));
    question.noOfAnswers = question.answer.length;
    await question.save();

    res.status(200).json({message:"Successfully deleted..."})
} catch (error) {
    res.status(405).json({ message: "Could not delete answer" })
}
}
