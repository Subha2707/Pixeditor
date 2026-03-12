const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const Conversion = require("../models/Conversion");

router.get("/",auth,async(req,res)=>{

  const history = await Conversion.find({
    userId:req.user.id
  }).sort({createdAt:-1});

  res.json(history);

});

module.exports = router;