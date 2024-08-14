const express = require("express");
const User = require("../model/userModel");
const router = express.Router();

// GET all users


router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Unable to fetch users" });
  }
});




// POST a new user
router.post("/user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({ msg: "User successfully created", user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Unable to create new user" });
  }
});

// PUT update user
router.put("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    res.status(200).json({ msg: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Unable to update user" });
  }
});



// DELETE a user
router.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Unable to delete user" });
  }
});

module.exports = router;
