import User from "../models/UserModel.js";
import * as userService from '../services/userServices.js'
import { validationResult } from 'express-validator';
import redisClient from "../services/redisServices.js";

export const createUserController = async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{
        const user = await userService.createUser(req.body);

        const token = await user.generateJWT();

        delete user._doc.password;

        return res.status(200).json({token,user});
    }catch(error){
        return res.status(400).json({error:error.message})
    }

}

export const loginController = async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{

        const {email,password} = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(400).json({errors:'Invalid Credentials'})
        }

        const isMatch = await user.isValidPassword(password);

        if(!isMatch){
            return res.status(400).json({errors:'Invalid Credentials'})
        }

        const token = await user.generateJWT();

        delete user._doc.password;

        return res.status(200).json({token,user});

    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

export const profileController = async (req,res)=>{
    console.log(req.user);

    return res.status(200).json({user:req.user})
}

export const logoutController = async (req,res)=>{
    try{
        const token = req.cookies.token||req.headers.authorization.split(' ')[1];

        redisClient.set(token,'logout','EX',24*60*60);

        res.status(200).json({
            message:"Logged out successfully"
        })

    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

export const getAllUsersController = async (req,res)=>{

    try{
        //we don't want the logged in user to be in output
        const loggedInUser = await User.findOne({email:req.user.email});
        const allUsers = await userService.getAllUsers({userId:loggedInUser._id});
        return res.status(200).json({users:allUsers})
    }catch(error){
        return res.status(400).json({
            error:error.message
        })
    }
}