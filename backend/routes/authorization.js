const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const data = {
        name: 'Some dummy response'
    }
    res.json(data);
})

module.exports = router;