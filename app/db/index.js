import mongoose from "mongoose";

const connect = async ()=>{
    const url = 'mongodb://127.0.0.1:27017/auth'
    mongoose.connect(url).then(console.log("connected")).catch(console.log("Error"))
}

export default connect