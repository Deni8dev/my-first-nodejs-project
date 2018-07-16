const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

/* POST users listening. */
router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        username: req.body.username,
        password: req.body.password
    });
    user.save()
        .then(result =>
            res.status(201).json({
                message: 'User was created'
            })
        )
        .catch(err =>
            res.status(500).json(getInternalError(err))
        );
});

/* GET All users listening. */
router.get('/', (req, res, next) => {
    User.find()
        .select("_id userId username password")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs
            };
            res.status(200).json(response);
        })
        .catch(err =>
            res.status(500).json(getInternalError(err))
        );
});

/* GET users by Id listening. */
router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .select("_id userId username password")
        .exec()
        .then(doc => {
            if (doc)
                res.status(200).json({
                    doc
                });
            else
                res.status(400).json({
                    message: 'No valid entry found for provided user id'
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(getInternalError(err));
        });
});

/* DELETE user by Id listening. */
router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result =>
            res.status(200).json({
                message: 'User deleted'
            })
        )
        .catch(err =>
            res.status(500).json(getInternalError(err))
        );
});

/* PATCH user by Id listening. */
router.patch('/:userId', (req, res, next) => {
    const updateProps = {};
    for (const ops of req.body) {
        updateProps[ops.propName] = ops.value;
    }
    const id = req.params.userId;
    User.update(
        {_id: id},
        {$set: updateProps})
        .exec()
        .then(result =>
            res.status(200).json({
                message: 'User updated',
                request: getRequestValue('GET', id)
            })
        )
        .catch(err =>
            res.status(500).json(getInternalError(err))
        );
});

function getInternalError(error) {
    return {
        message: 'Ups... We have problems, please try again later',
        details: error
    }
}

function getRequestValue(_type, _url) {
    return {
        type: _type,
        url: 'http://localhost:3000/api/v1/users/' + _url
    }
}

module.exports = router;
