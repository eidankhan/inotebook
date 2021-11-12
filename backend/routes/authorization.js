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
    (request, response) => {
    const erros = validationResult(request)
    if(!erros.isEmpty()){
        return response.status(400).json({erros: erros.array()})
    }
    User.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
    })
    .then( user => response.json(user))
    .catch(err => response.json({error: err, message: err.message}));
})


// router.get('/', (req, res) => {
//     console.log(req.check)
//     res.send(req.check)
// })

module.exports = router;