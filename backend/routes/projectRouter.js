import {Router} from 'express';
import {body} from 'express-validator'
import * as projectController from '../controllers/projectController.js'
import * as authMiddleware from '../middlewares/auth.js';

const router = Router();

router.post("/create",
body('name').isString().withMessage("Name is Required"), authMiddleware.authUser,
projectController.createProject);

//it will return all project in which the currently logged in user is enrolled
router.get('/all',authMiddleware.authUser,projectController.getAllProject);

router.put('/add-user',
body('projectId').isString().withMessage('Project ID is required'),
body('users').isArray({min:1}).withMessage('users must be an array of Strings').bail()
.custom((users)=>users.every(user=>typeof user==='string')).withMessage('each user must be a string'),
authMiddleware.authUser,projectController.addUserToProject);

router.get('/get-project/:projectId',authMiddleware.authUser,projectController.getProjectById);

router.put('/update-file-tree',
    authMiddleware.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('fileTree').isObject().withMessage('File tree is required'),
    projectController.updateFileTree
)


export default router;