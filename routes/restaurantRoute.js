import express from 'express'
import { userAuth } from '../middlewares/authMiddleware.js';
import { creatRestaurantController, getAllController, getByIdController, deleteController } from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

restaurantRouter.post('/create', userAuth, creatRestaurantController)
restaurantRouter.get('/getAll', getAllController) // get all
restaurantRouter.get('/get/:id', getByIdController) // get restaurant by id
restaurantRouter.get('/delete/:id', userAuth, deleteController) // get restaurant by id


export default restaurantRouter;