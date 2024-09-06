const { userModel } = require('../model')


const creatTodo = async (req, res) => {
    try {
        let { task, date, priority, completed } = req.body

        const saveTheData = await userModel.create({
            task,
            date: date || Date.now(),  // Set date to today if not provided
            priority,
            completed: completed || "No",  // Default Completed to "No" if not provided
        });

        console.log(saveTheData);

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Todo added successfully",
            data: saveTheData,
        });


    } catch (error) {
        console.log('error :>> ', error);
        console.log('error :>> ', error.message);
    }
}

module.exports = {
    creatTodo
}