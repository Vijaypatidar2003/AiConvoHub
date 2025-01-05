import Project from "../models/ProjectModel.js";
import User from "../models/UserModel.js";
import * as projectService from "../services/projectServices.js";
import { validationResult } from "express-validator";


export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const { name } = req.body;
    const email = req.user.email;
    const loggedInUser = await User.findOne({ email });
    const userId = loggedInUser._id;
    const newProject = await projectService.createProject({ name, userId });
    return res.status(200).json(newProject)
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
};

export const getAllProject = async (req,res)=>{
  try{
    const loggedInUser = await User.findOne({email:req.user.email});

    const userAllProjects = await projectService.getAllProjectsByUserId({userId:loggedInUser._id})

    return res.status(200).json({
      projects:userAllProjects
    })

  }catch(error){
    return res.status(400).json({
      error:error
    })
  }
}

export const addUserToProject = async(req,res)=>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }

  try{
    const {projectId,users} = req.body;
    const loggedInUser = await User.findOne({email:req.user.email});
    const userId=loggedInUser._id;
    const project = await projectService.addUsersToProject({projectId,users,userId});

    return res.status(200).json({project});

  }catch(error){
    return res.status(400).json({error:error.message})
  }
}

export const getProjectById = async(req,res)=>{
  try{
    const {projectId} = req.params;
    const project = await projectService.getProjectById({projectId});
    return res.status(200).json({
      project
    })
  }catch(error){
    return res.status(400).json({error:error.message})
  }
}

export const updateFileTree = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {

      const { projectId, fileTree } = req.body;

      const project = await projectService.updateFileTree({
          projectId,
          fileTree
      })

      return res.status(200).json({
          project
      })

  } catch (err) {
      console.log(err)
      res.status(400).json({ error: err.message })
  }

}