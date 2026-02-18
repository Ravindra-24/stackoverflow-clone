import mongoose from "mongoose"
import User from "../models/auth.js"


export const getAllUsers  = async(req, res) => {
    try {
        const allUsers = await User.find().select("_id name about tags joinedOn");
        const allUserDetails = []
        allUsers.forEach(users => {
            allUserDetails.push({_id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn})
        })
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateProfile = async(req, res) =>{
    
    const {id:_id} = req.params;
    const {name, about, tags} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('User unavailable...');
    }

    if (req.userId !== _id) {
        return res.status(403).json({ message: "You are not allowed to update this profile" });
    }

    if (!String(name || "").trim()) {
        return res.status(400).json({ message: "Display name is required" });
    }

    const normalizedTags = Array.isArray(tags)
        ? tags
        : String(tags || "").split(" ");
    const sanitizedTags = normalizedTags
        .map((tag) => String(tag).trim().toLowerCase())
        .filter(Boolean);

    try {
        const updateProfile = await User.findByIdAndUpdate(
            _id,
            {
                $set: {
                    name: String(name || "").trim(),
                    about: String(about || "").trim(),
                    tags: sanitizedTags,
                },
            },
            {new : true}
        ).select("-password")

        res.status(200).json(updateProfile)
    } catch (error) {
        res.status(405).json({message: error.message})
    }
}
