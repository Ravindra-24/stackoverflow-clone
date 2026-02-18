import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{type:String, required:true, trim: true},
    email:{type:String, required:true, unique: true, lowercase: true, trim: true},
    password:{type:String, required:true},
    about:{type:String },
    tags:{type:[String]},
    joinedOn:{type: Date, default: Date.now}
})

export default mongoose.model("User", userSchema)
