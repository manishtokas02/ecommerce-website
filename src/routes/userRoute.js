const express = require('express');
const { createUser } = require('../controllers/userController');  // Make sure the path is correct

const userRouter = express.Router();

userRouter.post('/', createUser);

module.exports = userRouter;  // Make sure this is `module.exports`
