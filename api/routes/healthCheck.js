const express = require('express');
const router = express.Router();

/* GET health check listening. */
router.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'Ok'
    });
});

module.exports = router;
