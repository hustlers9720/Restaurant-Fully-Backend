import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    },
    foods: {
        type: Array
    },
    time: {
        type: String
    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    logourl: {
        type: String
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,

    },
    ratingCount: {
        type: String
    },
    code: {
        type: String
    },
    coord: {
        id: {
            type: String
        },
        latitude: {
            type: Number
        },
        latitudeDelta: {
            type: Number
        },
        longitude: {
            type: Number
        },
        longitudeDelta: {
            type: Number
        },
        address: {
            type: String
        },
        title: { type: String }
    },
}, { timestamps: true })

const restaurantModel = mongoose.model('restaurant', restaurantSchema)

export default restaurantModel;