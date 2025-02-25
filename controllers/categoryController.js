import categoryModel from "../models/categoryModel.js";


const createController = async (req, res) => {

    try {
        const { title, imageurl } = req.body

        if (!title) {
            res.status(500).send({ message: false, message: 'Provide Infomation Detail' })
        }

        const newCategory = new categoryModel({ title })
        await newCategory.save();
        return res.status(200).send({ success: true, message: 'Category Create Successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: false, message: 'Error in create api' })
    }
}

const getAllController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        if (!category) {
            return res.status(500).send({ success: true, message: 'Category not found' })
        }

        res.status(200).send({ success: true, category });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: false, message: 'Error in get all api' })
    }
}

const updateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageurl } = req.body
        const updateCategory = await categoryModel.findByIdAndUpdate(id, { title, imageurl }, { new: true })

        if (!updateCategory) {
            return res.status(500).send({ success: false, message: 'No category Found' })
        }

        res.status(200).send({ success: true, message: 'Category update successfull' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: false, message: 'Error in update api' })
    }
}

const deleteController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(500).send({ success: true, message: 'id not Found' })
        }

        await categoryModel.findByIdAndDelete(id)
        return res.status(200).send({ success: true, message: 'Category Delete SuccessFully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: false, message: 'Error in update api' })
    }
}

export { createController, getAllController, updateController, deleteController }