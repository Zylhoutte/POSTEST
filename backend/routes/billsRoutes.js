const express = require("express")
const router = express.Router()
const { addBillsController, 
         getBillsController } = require("../controllers/billsController")



router.post("/addbills", addBillsController);

router.get("/getbills", getBillsController);

module.exports = router