const router = require("express").Router();
const Business = require("../models/Business");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
//register
router.post("/register", async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 5);
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      birthDate: req.body.birthDate,
    });
    const newUser = await user.save();
    res.status(200).json("registered succesfully");
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
});

router.post("/register/business", async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 5); //password hashing
  try {
    const newBusiness = new Business({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      location: req.body.location,
      description: req.body.description,
    });

    const newly = await newBusiness.save();
    res.status(200).json(newly);
  } catch (error) {
    res.status(500).json(error);
  }
});
//different login between user and business
router.post("/login/:type", async (req, res) => {
  try {
    if (req.params.type === "user") {
      const user = await User.findOne({ email: req.body.email });
      const isCorrect = bcrypt.compareSync(req.body.password, user.password); //hashed password check
      if (isCorrect) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
        res
          .cookie("accessToken", token, { httpOnly: true })
          .status(200)
          .json({ message: "Personal login welcome",token:token});
      } else {
        res.status(500).json({ message: "Password is wrong" });
      }
    } else {
      const business = await Business.findOne({ email: req.body.email });
      const isCorrect = bcrypt.compareSync(
        req.body.password,
        business.password
      );
      if (isCorrect) {
        res.status(200).json("Business welcome");
      } else {
        res.status(500).json("Password is wrong");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
//login
