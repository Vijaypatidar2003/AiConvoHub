import mongoose from "mongoose";

function connect(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to mongoDB")
    })
    .catch((error)=>{
        console.log(`error is =${error}`)
    })
}

export default connect;