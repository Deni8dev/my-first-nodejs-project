const express = require('express');
const fs = require('fs');
const {of} = require('rxjs');
const PropertiesReader = require('properties-reader');

const router = express.Router();

/* GET users listing. */
router.get('/:username/:password', function (req, res, next) {
    of(findUser(req.params.username, req.params.password))
        .subscribe(exist => {
            if (exist)
                res.status(200).json({
                    username: req.params.username,
                    password: req.params.password
                });
            else
                res.status(204).json({
                    response: 'User do no exist'
                });
        }, error =>
            res.status(500).json({
                error: 'Ups... We have problems',
                details: error
            })
        );
});

function findUser(username, password) {
    const properties = PropertiesReader('./configuration.properties');
    return JSON.parse(fs.readFileSync(properties.get("db.path"), 'utf8')).map(dbUser =>
        username === dbUser.username && password === dbUser.password
    ).find(exist => exist);
}

module.exports = router;
