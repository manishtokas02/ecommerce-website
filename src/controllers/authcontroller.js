const { loginUser } = require('../services/authService');

async function logout(req, res) {
    res.cookie("authToken"," ")
    return res.status(200).json({
        success:true,
        message:"Logout Sucfcesfully",
        error:{},
        data:{}
    })

    

}
async function login(req, res) {
    try {
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);
             res.cookie('authToken',response,{
                        httpOnly:true,
                        secure:false,
                        maxAge:7*24*60*60*1000,
                       

             })
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            data: {},
            error: {}
        });
    } catch (error) {
        console.error("Login Error:", error); // Log error details
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || "Login failed",
            error: error
        });
    }
}

module.exports = {
    login,logout
};
