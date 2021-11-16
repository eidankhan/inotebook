const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUserDetails = require("../middleware/fetchUserDetails");

const JWT_SECRET = "ekhan";

// Endpoint to save data of a new user
router.post(
  "/createUser",
  [
    check("name", "Name should be at least 3 characters long").isLength({
      min: 3,
    }),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password should be at least 5 characters long").isLength(
      { min: 5 }
    ),
  ],
  async (request, response) => {
    // Flag for success message
    let success = false;
    // If there are errors
    const erros = validationResult(request);
    if (!erros.isEmpty()) {
      return response.status(400).json({ success: success, erros: erros.array() });
    }

    // Check whether the user with this email already exists or not
    try {
      let user = await User.findOne({ email: request.body.email });
      if (user) {
        return response
          .status(500)
          .json({ success: success, message: "Sorry, a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(request.body.password, salt);
      user = await User.create({
        name: request.body.name,
        email: request.body.email,
        password: secretPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      response.json({ success: success, authToken });
    } catch (error) {
      console.log("error:" + error);
      response.status(500).json({success: success, error:error});
    }
  }
);

// User Authentication end point
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password cant be blank").exists(),
  ],
  async (request, response) => {
    // Flag variable for success
    let success = false;
    // If there are errors
    const erros = validationResult(request);
    if (!erros.isEmpty()) {
      return response.status(400).json({ success: success, erros: erros.array() });
    }

    const { email, password } = request.body;
    // console.log('Email:'+email+" Password:"+password)
    // Check whether user exists or not
    try {
      let user = await User.findOne({ email });
      if (!user) {
        console.log("User doesnt exist");
        return response
          .status(500)
          .json({ success: success, message: "Please, login with correct credentials" });
      }
      const passwordValidation = await bcrypt.compare(password, user.password);
      if (!passwordValidation) {
        console.log("password mismatch");
        return response
          .status(500)
          .json({ success: success, message: "Please, login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      response.json({ success: success, authToken });
    } catch (error) {
      console.log("error:" + error.message);
      response.status(500).json({success: success, message:"Internal server error"});
    }
  }
);

// Route 3: Decoding jwt to get details of currently logged in user

router.post("/userdetails", fetchUserDetails, async (request, response) => {
  try {
    const userId = request.user.id;
    const user = await User.findById(userId).select("-password");
    response.send(user);
  } catch (error) {
    console.log("error:" + error.message);
    response.status(500).send("Internal server error");
  }
});

module.exports = router;
