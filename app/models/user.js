import mongoose from "mongoose";
const userSchems = new mongoose.Schema({
    userName: String,
    email: String,
    password: String
})
const user = mongoose.models.Users || mongoose.model('Users',userSchems)

export default user