const express = require('express');
const router = express.Router();
const { ensureUserLoggedIn, ensureSameUser } = require('../middleware/guards');


/**
 * GET /
 **/

router.get('/', function(req, res, next) {
    res.send({ message: 'Welcome to the AuthAuth homepage! Try /users' });
});


/**
 * GET /members-only
 **/

router.get('/members-only', ensureUserLoggedIn, function(req, res, next) {
    res.send({ message: 'Here is your Members Only content from the server...' });
});

router.get('/members-only/:id', ensureSameUser, function(req, res, next) {
    res.send({ message: `Here is your Members Only content from the server for ${req.params.id}` });
});
module.exports = router;