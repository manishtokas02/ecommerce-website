const { findUser } = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRY, JWT_SECRET } = require('../config/serverConfig');

async function loginUser(authDetails) {
    const { email, password } = authDetails; 

    

    const user = await findUser({ email });

    if (!user) {
        throw { reason: "User not registered with this email ID", statusCode: 404 };
    }

   

    
    if (!user.password) {
        throw { reason: "User does not have a password set", statusCode: 400 };
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw { reason: "Password incorrect, please try again", statusCode: 401 };
    }

    const userRole = user.role? user.role:"USER";

    const token = jwt.sign({ email: user.email, id: user._id ,role:userRole}, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    });

    return token
}

module.exports = {
    loginUser
};
