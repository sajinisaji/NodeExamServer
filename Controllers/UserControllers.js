const users = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerController = async (req, res) => {
  console.log("Insider Register Function");
  const { firstName, lastName, Email, password, phoneNumber } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  console.log(firstName, lastName, Email, password, phoneNumber);
  try {
    const existingUser = await users.findOne({ Email });
    if (existingUser) {
      res.status(406).json("Account already exist!!! Please Login");
    } else {
      const newUser = new users({
        firstName,
        lastName,
        Email,
        password: hashedPassword,
        phoneNumber,
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.loginController = async (req, res) => {
  console.log("Inside login function");
  const { Email, password } = req.body;
  console.log(Email, password);
  try {
    const existingUser = await users.findOne({ Email });
    if (!existingUser) {
      return res.status(404).json("Invalid Email/Password...");
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(404).json("Invalid Email/Password...");
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_PASSWORD
    );

    res.status(200).json({ user: existingUser, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
exports.listUsersController = async (req, res) => {
    console.log("Inside getAllUsers");
    try {
      const user = await users.find({}, '-password');
      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(401).json(err);
    }
  };

  exports.viewUserController = async (req, res) => {
    const { id } = req.params;
    console.log("Inside get specific Users");
    try {
      const user = await users.findById(id, '-password');
      if (!user) {
        return res.status(404).json("User not found.");
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  