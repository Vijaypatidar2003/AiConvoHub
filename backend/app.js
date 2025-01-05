import express from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoute from './routes/userRouter.js'
import projectRoute from './routes/projectRouter.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import ai from './routes/aiRoutes.js'
const app = express();
connect();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
// app.use(cors());
const cors = require('cors');
app.use(cors({ origin: 'https://aiconvohub-frontend.onrender.com' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://aiconvohub-frontend.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/users',userRoute)
app.use('/projects',projectRoute)
app.use('/ai',ai);

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

export default app;
