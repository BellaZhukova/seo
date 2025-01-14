import express from "express";
import { authorizeProject, registrationProject } from "../controllers/projectController.js"
import authenticateToken from "../middleware/errorHandler.js";

const router = express.Router();

router.post('/login', authorizeProject);
router.post('/registration', registrationProject)

export default router;