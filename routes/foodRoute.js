import express from 'express'
import { createFoodController, getAllFoodController, getSingleFoodController, updateFoodController, deleteFoodController } from '../controllers/foodController.js';

const foodRouter = express.Router();

foodRouter.post('/createFood', createFoodController)
foodRouter.get('/getAll', getAllFoodController)
foodRouter.get('/getfood/:id', getSingleFoodController)
foodRouter.put('/updateFood/:id', updateFoodController)
foodRouter.put('/delete/:id', deleteFoodController)




export default foodRouter;