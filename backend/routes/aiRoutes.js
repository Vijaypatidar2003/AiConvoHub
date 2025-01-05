import { Router } from "express";
import * as aiController from '../controllers/aiController.js'
import * as authMiddleware from '../middlewares/auth.js'
const router = Router();

router.get('/get-result',aiController.getResult)

export default router;
