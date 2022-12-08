const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js')




exports.protect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.SECRET)


            req.user = await User.findById(decoded.id)



            next()

        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Token Failed")
        }


    } else {
        res.status(401);
        throw new Error("Token Not Found")
    }

})

exports.admin = asyncHandler((req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("You Are Not Authorized...Admin Only")
    }
})

