import Project from '../models/ProjectModel.js'
import mongoose from 'mongoose';

export const createProject = async ({name,userId})=>{
    if(!name){
        throw new Error("name is required");
    }
    if(!userId){
        throw new Error("userId is required");
    }

    const project = await Project.create({
        name,
        users:[userId]
    })
    return project;
}

export const getAllProjectsByUserId = async({userId})=>{
    if(!userId){
        throw new Error("userId is required");
    }
    const userAllProjects = await Project.find({users:userId});

    return userAllProjects;
}

export const addUsersToProject = async({projectId,users,userId})=>{
    if(!userId){
        throw new Error('ProjectId is required')
    }
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("userId is invalid")
    }
    if(!projectId){
        throw new Error('ProjectId is required')
    }
    if(!users){
        throw new Error("users is required")
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("projectId is invalid")
    }
    if(!Array.isArray(users)|| users.some((userId)=>!mongoose.Types.ObjectId.isValid(userId))){
        throw new Error("invalid userId in users array")
    }
    //user can add another users only if he is in project
    const project = await Project.findOne({
        _id:projectId,
        users:userId
    })

    if(!project){
        throw new Error('user does not belong to this project')
    }

    const updatedProject = await Project.findOneAndUpdate({_id:projectId},
        {
            $addToSet:{
                users:{
                    $each:users
                }
            }
        },{new:true})

    return updatedProject;
}

export const getProjectById = async({projectId})=>{
    if(!projectId){
        throw new Error('ProjectId is required')
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("projectId is invalid")
    }
    const project = await Project.findOne({_id:projectId}).populate('users');
    return project;

}

export const updateFileTree = async ({ projectId, fileTree }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    if (!fileTree) {
        throw new Error("fileTree is required")
    }

    const project = await Project.findOneAndUpdate({
        _id: projectId
    }, {
        fileTree
    }, {
        new: true
    })

    return project;
}