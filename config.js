require("dotenv").config();

// Required by bcrypt
const SUPER_SECRET = process.env.SUPER_SECRET || 'my weak (!!) secret key';
const BCRYPT_WORK_FACTOR = 12;  // determines "strength" of hashing

module.exports = {
    SUPER_SECRET,
    BCRYPT_WORK_FACTOR
};