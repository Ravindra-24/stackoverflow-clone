import mongoose from "mongoose"
import User from "../models/auth.js"


export const getAllUsers  = async(req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = []
        allUsers.forEach(users => {
            allUserDetails.push({_id: users._id, name: users.name, anout: users.about, tags: users.tags, joinedOn: users.joinedOn})
        })
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}