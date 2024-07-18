const express = require("express");
const bodyParser = require("body-parser");
const User = require("../model/userModel");

const router = express.Router();
router.use(bodyParser.json());

router.get("/",(req,res)=>{
    res.send("Hello from user route");
})


router.post("/user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json({ msg: "User Successfully Posted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Unable to save new User" });
  }
});

module.exports = router;
