const express = require('express');
const fs = require('fs');
const {of} = require('rxjs');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./configuration.properties');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    of(true)
        .subscribe(() =>
            res.status(200).json({
                users: JSON.parse(fs.readFileSync(properties.get("db.path"), 'utf8'))
            })
        , error =>
            res.status(500).json({
                error: 'Ups... We have problems',
                details: error
            })
        );
});

module.exports = router;
