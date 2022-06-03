var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SUPER_SECRET } = require('../config');
const db = require("../model/helper");
const usersShouldBeLoggedIn= require("../middleware/guards");
require("dotenv").config();
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET
/**
 * Register a user
 **/

router.post('/register', async (req, res, next) => {
    let { username, password, email } = req.body;
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        let sql = `
            INSERT INTO users (username, password, email)
            VALUES ('${username}', '${hashedPassword}', '${email}')
        `;
        await db(sql);
        res.send({ message: 'Registration succeeded' });
    } catch (err) {
        res.status(400).send({message: err.message})
    }
});


/**
 * Log in a user
 **/

router.post('/login', async (req, res, next) => {
    let { username, password } = req.body;

    try {
        let results = await db(`SELECT * FROM users WHERE username = '${username}'`);
        if (results.data.length === 0) {
            // Username not found
            res.status(401).send({ error: 'Login failed' });
        } else {
            let user = results.data[0];  // the user's row/record from the DB
            let passwordsEqual = await bcrypt.compare(password, user.password);
            if (passwordsEqual) {
                // Passwords match
                let payload = { userId: user.id };
                // Create token containing user ID
                let token = jwt.sign(payload, supersecret);
                // Also return user (without password)
                delete user.password;
                res.send({
                    message: 'Login succeeded',
                    token: token,
                    user: user
                });
            } else {
                // Passwords don't match
                res.status(401).send({ error: 'Login failed' });
            }
        }
    } catch (err) {
        next(err);
    }
});


module.exports = router;