import express from 'express';
import { getStreamToken } from '../controller/chat.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';
const chatRouter = express.Router();


chatRouter.get('/token', protectedRoute, getStreamToken);

export default chatRouter;