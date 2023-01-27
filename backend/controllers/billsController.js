const Bills = require("../models/billsModel.js")

//for add or fetch
const getBillsController = async (req, res) => {
    try {

        const bills = await Bills.find();
        res.send(bills);

    } catch(error) {
        console.log(error);
    }
}

//for add
 const addBillsController = async (req, res) => {

    try {

        const newBills = new Bills(req.body);
        await newBills.save();
        res.send("Bill Created Successfully!");

    } catch(error) {
        console.log(error);
    }

}

module.exports = {
    getBillsController,
    addBillsController,
}