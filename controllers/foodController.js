import foodModel from "../models/foodModel.js";

const createFoodController = async (req, res) => {

    try {

        const { title, description, price, imageurl, foodtags, category, code, isAvailable, restaurant, rating } = req.body;

        if (!title || !description || !price || !restaurant) {
            return res.status(500).send({ success: false, message: 'Provide neccessary Details' })
        }

        const newFood = new foodModel({
            title, description, price, imageurl, foodtags, category, code, isAvailable, restaurant, rating
        })

        await newFood.save();
        return res.status(200).send({ success: true, message: 'Food Create Successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error in create food api' })
    }

}


const getAllFoodController = async (req, res) => {
    try {

        const foods = await foodModel.find({})

        if (!foods) {
            return res.status(500).send({ success: false, message: 'Foods not Available' })
        }

        res.status(200).send({ success: true, foods })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error in get all food api' })
    }
}

const getSingleFoodController = async (req, res) => {
    try {

        const id = req.params.id

        if (!id) {
            return res.status(500).send({ success: false, message: 'Please Provide id' })
        }

        const food = await foodModel.findById(id);

        if (!food) {
            return res.status(500).send({
                success: false, message: 'Food Not Available'
            })
        }

        return res.status(200).send({ success: true, food })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error in get food api' })
    }
}


const updateFoodController = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(500).send({ success: false, message: ' Provide id Found' })
        }
        const food = await foodModel.findById(id)
        if (!food) {
            return res.status(500).send({ success: false, message: 'Food not Found' })
        }

        const { title, description, price, imageurl, foodtags, category, code, isAvailable, restaurant, rating } = req.body;

        const updateFood = await foodModel.findByIdAndUpdate(id, {
            title, description, price, imageurl, foodtags, category, code, isAvailable, restaurant, rating
        }, { new: true })

        await updateFood.save();
        return res.status(200).send({ success: true, message: 'Update Successfully', updateFood })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in update food api' })
    }
}

const deleteFoodController = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(500).send({ success: false, message: ' Provide id Found' })
        }
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(500).send({ success: false, message: 'Food not found' })
        }
        await foodModel.findByIdAndDelete(id)
        res.status(500).send({ success: true, message: 'Food Delete SuccessFully' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in delete food api' })
    }
}




export { createFoodController, getAllFoodController, getSingleFoodController, updateFoodController, deleteFoodController }