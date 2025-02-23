const CustomError = require('../errors');
const {isTokenValid} = require('../utils');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    try{
        const {name, userID, role} = isTokenValid({token});
        req.user = {name, userID, role};
        next();
    }
    catch(error){
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
};

const authorizePermissions = (req, res, next) => {
    if(req.user.role !== 'admin'){
        throw new CustomError.UnauthorizedError('Unauthorized to access this route')
    }
    next();
}

module.exports = {
    authenticateUser,
    authorizePermissions
}