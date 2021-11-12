const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { check, validationResult } = require('express-validator');


// Endpoint to save data of a new user
router.post(
    '/', 
    [
        check('name', 'Name should be at least 3 characters long').isLength({min: 3}),
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'Password should be at least 5 characters long').isLength({min: 5})
    ], 
    async (request, response) => {
    // If there are errors
    const erros = validationResult(request)
    if(!erros.isEmpty()){
        return response.status(400).json({erros: erros.array()})
    }

    // Check whether the user with this email already exists or not
    try{
    let user = await User.findOne({email: request.body.email})
    if(user){
        return response.status(500).json({message: "Sorry, a user with this email already exists"})
    }
    user = await User.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
    })
    response.json(user);
    }catch(error){
        console.log("error:"+error);
        response.status(500).json(error)
    }
})

module.exports = router;