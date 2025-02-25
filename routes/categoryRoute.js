import express from 'express'
import { userAuth } from '../middlewares/authMiddleware.js';
import { createController, getAllController, updateController, deleteController } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post('/create', userAuth, createController)
categoryRouter.get('/getAll', getAllController)
categoryRouter.put('/update/:id', updateController)
categoryRouter.delete('/delete/:id', userAuth, deleteController)


export default categoryRouter;