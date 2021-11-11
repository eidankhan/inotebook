const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const data = {
        name: 'Notes response'
    }
    res.json(data);
})

module.exports = router;