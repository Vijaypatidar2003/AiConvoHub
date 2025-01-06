import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:[6,'Email must be atleast 6 characters long'],
        maxLength:[50,'Email must be atmax 50 characters long'],
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

userSchema.statics.hashPassword =  function(password){
    return  bcrypt.hashSync(password,10);
}

userSchema.methods.isValidPassword =  function(password){
    return bcrypt.compareSync(password,this.password);
}

userSchema.methods.generateJWT = async function(){
    return jwt.sign({email:this.email,id:this._id},process.env.SECRET_KEY,{expiresIn:'24h'})
}

const User = mongoose.model("User",userSchema);
export default User;
