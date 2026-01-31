import express from 'express';
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../config/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router();

//add educator role

// Require authentication for role update so req.auth.userId is present
educatorRouter.post('/update-role', protectEducator, updateRoleToEducator);
educatorRouter.post('/add-course', protectEducator, upload.single('image'), addCourse)
educatorRouter.get('/courses', protectEducator, getEducatorCourses);
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData);
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);


export default educatorRouter;