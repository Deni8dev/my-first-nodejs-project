const express = require('express');
const fs = require('fs');
const {of} = require('rxjs');

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    of(true)
        .subscribe(() =>
            res.status(200).json({
                users: JSON.parse(fs.readFileSync('/home/dac/DMS/db.json', 'utf8'))
            })
        , error =>
            res.status(500).json({
                error: 'Ups... We have problems',
                details: error
            })
        );
});

module.exports = router;
