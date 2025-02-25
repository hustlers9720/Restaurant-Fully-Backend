import restaurantModel from "../models/restaurantModel.js";

// create restaurant 
const creatRestaurantController = async (req, res) => {

    try {

        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logourl, rating, ratingCount, code, coord } = req.body;

        if (!title || !coord) {
            return res.status(500).send({ success: false, message: 'Provide Sufficeint details' });
        }
        const newRestaurant = await restaurantModel({ title, imageUrl, foods, time, pickup, delivery, isOpen, logourl, rating, ratingCount, code, coord })
        await newRestaurant.save();
        return res.status(200).send({ success: true, message: 'Restaurant Created Successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error in create api', error })
    }
}


const getAllController = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findOne({});
        if (!restaurant) {
            return res.send(404).send({ sucess: false, message: 'No restaurant Available' })
        }
        return res.status(200).send({ success: true, totalCount: restaurant.length, restaurant })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error in get all api', error })
    }
}

const getByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.send(404).send({ sucess: false, message: 'No restaurant Found' })
        }
        return res.status(200).send({ success: true, restaurant })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error in get by id api', error })
    }
}

const deleteController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.send(404).send({ sucess: false, message: 'No id Found' })
        }
        await restaurantModel.findByIdAndDelete(id);
        return res.status(200).send({ success: true, message: "Restaurant Delete SuccessFully" })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Error in Delete api', error })
    }

}

export { creatRestaurantController, getAllController, getByIdController, deleteController }