import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Foods'
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['preparing', 'prepare', 'on the way', 'delivered'],
        default: 'preparing'

    }


}, { timestamps: true })

const orderModel = mongoose.model('order', orderSchema);

export default orderModel;