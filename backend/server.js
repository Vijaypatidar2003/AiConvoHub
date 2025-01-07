import 'dotenv/config.js'

import http from 'http';
import {Server} from 'socket.io'
import app from "./app.js";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Project from './models/ProjectModel.js';
import { generateResult } from './services/aiServices.js';

const PORT=4000;


const server = http.createServer(app);

const io = new Server(server,{
    cors:{
     origin: 'https://aiconvohub-frontend.onrender.com',
    credentials: true,
    }
});

io.use(async (socket,next)=>{
    try{

        const token = socket.handshake.auth?.token||socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;

        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('Invalid ProjectId'))
        }

        socket.project = await Project.findById(projectId);

        
        if(!token){
            return next(new Error('Authentication Error'));
        }

        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        
        if(!decoded){
            return new(new Error('Authentication Error'));
        }

        socket.user=decoded;

        next();

    }catch(error){
        next(error);
        //if this run user will not be able to connect;
    }
})
// When a client connects, the server triggers this event.
io.on('connection',(socket)=>{
    socket.roomId = socket.project._id.toString();
    socket.join(socket.roomId);
    socket.on('project-message',async(data)=>{
        
        // socket.broadcast.to(socket.roomId).emit('project-message',data);
        
        const message = data.message;
        const aiIsPresentInMessage = message.includes("@ai");

        if(aiIsPresentInMessage){
            
            const prompt = message.replace('@ai',"");

            const result = await generateResult(prompt);

            socket.emit('project-message',{
                message:result,
                sender:{
                    _id:'ai',
                    email:'AI'
                }
            })
            return
        }else{
            socket.broadcast.to(socket.roomId).emit('project-message',data);
        }
        console.log(data)
       
    })
    console.log('a user connected')
   
    socket.on('disconnect',()=>{
        console.log('a user disconnected')
        socket.leave(socket.roomId);
    })
})



server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
