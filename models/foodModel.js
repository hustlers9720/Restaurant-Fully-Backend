import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    title: {
        type: String,
        reuired: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    imageurl: {
        type: String,
        default: 'https://assets.zenn.com/strapi_assets/food_logo_5fbb88038c.png'
    },
    foodtags: {
        type: String,
    },
    category: {
        type: String,
    },
    code: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingcount: {
        type: String,
    }



}, { timestamps: true })

const foodModel = mongoose.model('food', foodSchema);

export default foodModel;