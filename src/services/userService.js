const { findUser, createUser } = require("../repositories/userRepository");
const{createCart}=require("../repositories/cartRepositories")

async function registerUser(userDetails) {
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });

    if (user) {
        throw { reason: "User already registered with the given number" };
    }

    const newUser = await createUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        password: userDetails.password
    });

    if (!newUser) {
        throw { reason: "User not created, something went wrong" };
    }

    await createCart(newUser._id)

    return newUser;
}

module.exports = {
    registerUser
};
