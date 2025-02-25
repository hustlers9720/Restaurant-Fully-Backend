import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        default: 'https://assets.zenn.com/strapi_assets/food_logo_5fbb88038c.png'
    },
}, { timestamps: true })

const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;