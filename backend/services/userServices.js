import User from "../models/UserModel.js";

export const createUser = async ({email,password})=>{
    if(!email||!password){
        throw new Error('email and password are required');
    }
    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
        email,
        password:hashedPassword
    })

    return user;
}

export const getAllUsers = async ({userId})=>{
    const users = await User.find({_id:{$ne:userId}});
    return users;
}