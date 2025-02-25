import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

// get user info
const getUserController = async (req, res) => {
    try {

        const user = await userModel.findById({ _id: req.body.id });

        if (!user) {
            return res.status(404).send({ success: false, message: 'Cant get user' })
        }

        user.password = undefined
        res.status(200).send({ success: true, message: 'User data get Successfully', user })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in get api', error })
    }
}


const updateUserController = async (req, res) => {

    try {

        const user = await userModel.findById({ _id: req.body.id })

        if (!user) {
            return res.status(404).send({ success: false, message: 'User Not Found' })
        }

        const { username, address, phone } = req.body

        if (username) user.username = username
        if (address) user.address = address
        if (phone) user.phone = phone

        await user.save();
        res.status(200).send({ success: true, message: 'User update successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in update api', error })
    }

}


const resetPasswordController = async (req, res) => {
    try {

        const { email, newpassword, answer } = req.body
        if (!email || !newpassword || !answer) {
            return res.status(500).send({ success: false, message: 'Provide the details' })
        }

        const user = await userModel.findOne({ email, answer })

        if (!user) {
            return res.status(500).send({ success: false, message: 'Provide the email and answer' })
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedPassword
        await user.save();
        res.status(200).send({ success: true, messag: 'Password Reset Successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in reset password api', error })
    }
}

const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel({ _id: req.body.id })

        if (!user) {
            return res.status(500).send({ success: false, message: 'User not Found' })
        }

        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(500).send({ success: false, message: 'Provide information' })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid old password'
            });
        }

        user.password = newPassword
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword
        await user.save();
        return res.status(200).send({ success: true, message: 'User password update Successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in update password api', error })
    }
}


const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({ success: true, message: "User Delete Successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in Delete user api', error })
    }
}


const placeorderController = async (req, res) => {
    try {
        const { cart } = req.body
        //map cart
        let total = 0
        cart.map((i) => {
            total += i.price
        })

        const newOrder = await orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id
        })

        res.status(200).send({ success: true, message: 'order Placed Successfully', newOrder })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in Order Place user api', error })
    }
}
export { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController, placeorderController }