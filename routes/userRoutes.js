import express from 'express'
import { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController, placeorderController } from '../controllers/userController.js';
import { userAuth } from '../middlewares/authMiddleware.js';


const userRouter = express.Router()

//register 
userRouter.get('/getUser', userAuth, getUserController);
userRouter.put('/updateUser', userAuth, updateUserController)
userRouter.post('/updatePassword', userAuth, updatePasswordController)
userRouter.post('/resetPassword', userAuth, resetPasswordController)
userRouter.delete('/deleteUser/:id', userAuth, deleteUserController)


userRouter.post('/placeOrder', userAuth, placeorderController)

export default userRouter;