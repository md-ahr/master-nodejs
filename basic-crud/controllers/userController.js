const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res
      .status(200)
      .json({ success: true, payload: { total: users?.length, users } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    return res.json({ success: true, payload: { user } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, gender, jobTitle } = req.body;
  if (!firstName || !email) {
    return res.status(400).json({
      success: false,
      message: "Please filled the all required fields",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "Email already exist, please try another one!",
      });
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      gender,
      jobTitle,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      payload: user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    return res.json({
      success: true,
      message: "User updated successfully!",
      payload: { updatedUser },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    return res.json({
      success: true,
      message: "User deleted successfully!",
      payload: { deletedUser },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
