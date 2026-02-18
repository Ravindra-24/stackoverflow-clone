import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

const MAX_LIMIT = 30;
const DEFAULT_LIMIT = 10;

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const AskQuestion = async (req, res)=> {
    const { questionTitle, questionBody, questionTags, userPosted } = req.body;
    const normalizedTags = Array.isArray(questionTags)
        ? questionTags
        : String(questionTags || "").split(" ");
    const sanitizedTags = normalizedTags
        .map((tag) => String(tag).trim().toLowerCase())
        .filter(Boolean)
        .slice(0, 5);

    if (!questionTitle?.trim() || !questionBody?.trim() || sanitizedTags.length === 0) {
        return res.status(400).json({ message: "Title, body and at least one tag are required" });
    }

    const postQuestion = new Questions({
        questionTitle: questionTitle.trim(),
        questionBody: questionBody.trim(),
        questionTags: sanitizedTags,
        userPosted: String(userPosted || "Anonymous").trim(),
        userId: req.userId,
    });

    try {
        await postQuestion.save();
        res.status(201).json({ message: "Posted a question successfully", question: postQuestion })
    } catch (error) {
        res.status(409).json({ message: "Couldn't post a new question" })
    }
}

export const getAllQuestions = async (req, res) => {
    const {
        q = "",
        tag = "",
        sort = "newest",
        page = "1",
        limit = String(DEFAULT_LIMIT),
    } = req.query;

    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT);
    const skip = (parsedPage - 1) * parsedLimit;

    const filter = {};
    const searchQuery = String(q).trim();
    const tagQuery = String(tag).trim();

    if (searchQuery) {
        const safeSearch = escapeRegex(searchQuery);
        filter.$or = [
            { questionTitle: { $regex: safeSearch, $options: "i" } },
            { questionBody: { $regex: safeSearch, $options: "i" } },
            { userPosted: { $regex: safeSearch, $options: "i" } },
        ];
    }

    if (tagQuery) {
        filter.questionTags = { $elemMatch: { $regex: `^${escapeRegex(tagQuery)}$`, $options: "i" } };
    }

    try {
        const total = await Questions.countDocuments(filter);
        const totalPages = Math.max(Math.ceil(total / parsedLimit), 1);
        const finalPage = Math.min(parsedPage, totalPages);
        const finalSkip = (finalPage - 1) * parsedLimit;

        let questionList = [];
        if (sort === "mostVotes") {
            questionList = await Questions.aggregate([
                { $match: filter },
                {
                    $addFields: {
                        voteScore: { $subtract: [{ $size: "$upVote" }, { $size: "$downVote" }] },
                    },
                },
                { $sort: { voteScore: -1, askedOn: -1 } },
                { $skip: finalSkip },
                { $limit: parsedLimit },
            ]);
        } else {
            const sortOrder = {
                newest: { askedOn: -1 },
                oldest: { askedOn: 1 },
                mostAnswers: { noOfAnswers: -1, askedOn: -1 },
            }[sort] || { askedOn: -1 };

            questionList = await Questions.find(filter)
                .sort(sortOrder)
                .skip(finalSkip)
                .limit(parsedLimit);
        }

        res.status(200).json({
            items: questionList,
            total,
            page: finalPage,
            limit: parsedLimit,
            totalPages,
            hasNextPage: finalPage < totalPages,
            hasPrevPage: finalPage > 1,
            filters: {
                q: searchQuery,
                tag: tagQuery,
                sort,
            },
        });
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getQuestionById = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Question unavailable..." });
    }

    try {
        const question = await Questions.findById(_id);
        if (!question) {
            return res.status(404).json({ message: "Question unavailable..." });
        }

        return res.status(200).json(question);
    } catch (error) {
        return res.status(500).json({ message: "Unable to fetch question" });
    }
}

export const deleteQuestion = async (req, res) =>{
        const {id: _id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('question unavailable...');
        }
        try {
            const question = await Questions.findById(_id);
            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            if (question.userId !== req.userId) {
                return res.status(403).json({ message: "You are not allowed to delete this question" });
            }

            await Questions.findByIdAndDelete(_id);
            res.status(200).json({message: 'successfully deleted...'})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
}

export const voteQuestion = async(req, res) =>{
    const {id: _id} = req.params;
    const {value} = req.body;
    const userId = req.userId;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    if (!["upVote", "downVote"].includes(value)) {
        return res.status(400).json({ message: "Invalid vote type" });
    }

    try {
        const question = await Questions.findById(_id)
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const upIndex = question.upVote.findIndex((id)=> id === String(userId))
        const downIndex = question.downVote.findIndex((id)=> id === String(userId))
        
        if(value === 'upVote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((id)=> id !== String(userId))
            }
            if(upIndex === -1){
                question.upVote.push(userId)
            }else{
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        } else  if(value === 'downVote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id)=> id !== String(userId))
            }
            if(downIndex === -1){
                question.downVote.push(userId)
            }else{
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
         } 
         await Questions.findByIdAndUpdate(_id, question, { new: true })
         res.status(200).json({message:"Voted successfully..."})
}catch (error) {
        res.status(404).json({message:"ID not found..."})
    }
}

export const getQuestionStats = async (req, res) => {
    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const [totalQuestions, unansweredQuestions, answersAggregate, recentQuestions, topTags] =
            await Promise.all([
                Questions.countDocuments(),
                Questions.countDocuments({ noOfAnswers: 0 }),
                Questions.aggregate([{ $group: { _id: null, totalAnswers: { $sum: "$noOfAnswers" } } }]),
                Questions.countDocuments({ askedOn: { $gte: sevenDaysAgo } }),
                Questions.aggregate([
                    { $unwind: "$questionTags" },
                    { $group: { _id: { $toLower: "$questionTags" }, count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                    { $limit: 8 },
                    { $project: { _id: 0, tag: "$_id", count: 1 } },
                ]),
            ]);

        res.status(200).json({
            totalQuestions,
            totalAnswers: answersAggregate[0]?.totalAnswers || 0,
            unansweredQuestions,
            answeredQuestions: totalQuestions - unansweredQuestions,
            recentQuestions,
            topTags,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch question statistics" });
    }
};
