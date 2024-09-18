const express = require('express');
const { login ,logout} = require('../controllers/authcontroller');  

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);

module.exports = authRouter;  // Make sure this is `module.exports`
