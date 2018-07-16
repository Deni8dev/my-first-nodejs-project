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
            res.status(500).json({
                message: 'Ups... We have problems',
                details: err
            })
        );
});

/* GET All users listening. */
router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(docs =>
            res.status(200).json({
                users: docs
            })
        )
        .catch(err =>
            res.status(500).json({
                message: 'Ups... We have problems',
                details: err
            })
        );
});

/* GET users by Id listening. */
router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
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
            res.status(500).json({
                message: 'Ups... We have problems',
                details: err
            });
        });
});

/* DELETE user by Id listening. */
router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result =>
            res.status(200).json(result)
        )
        .catch(err =>
            res.status(500).json({
                message: 'Ups... We have problems',
                details: err
            })
        );
});

/* PATCH user by Id listening. */
router.patch('/:userId', (req, res, next) => {
    const updateProps = {};
    for (const ops of req.body) {
        updateProps[ops.propName] = ops.value;
    }
    User.update(
        {_id: req.params.userId},
        {$set: updateProps})
        .exec()
        .then(result =>
            res.status(200).json(result)
        )
        .catch(err =>
            res.status(500).json({
                message: 'Ups... We have problems',
                details: err
            })
        );
});

module.exports = router;
