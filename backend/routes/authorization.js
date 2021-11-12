const express = require('express');
const router = express.Router();
const User = require('../models/User')

// Endpoint to save data of a new user
router.post('/', (request, response) => {
    const user = User(request.body);
    user.save();
    response.send(request.body);
})


// router.get('/', (req, res) => {
//     console.log(req.body)
//     res.send(req.body)
// })

module.exports = router;