import jwt from 'jsonwebtoken'
import redisClient from '../services/redisServices.js';

export const authUser = async (req, res, next)=>{
    try{
        const token = req.cookies.token||req.headers.authorization.split(' ')[1];
        console.log(token)
        if(!token){
            return res.status(400).json({error:"Unauthorized User"});
        }

        const isBlackListed = await redisClient.get(token);

        if(isBlackListed){
            res.cookie('token',"");
            return res.status(400).json({error:"Unauthorized User"});
        }

        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(400).json({error:'Please Authenticate'});
    }
}