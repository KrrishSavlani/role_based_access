const {validateToken} = require('../services/auth');
function fetchToken(req, res, next) {
    const token = req.cookies.token//?.split(' ')[1];
    if(!token) {req.token = false; }
    else {
        req.token = token;
        const publicRoutes = ['/api/login', '/api/signup'];
        if (publicRoutes.includes(req.path)) {
            return res.redirect('/api/'); // Skip middleware for public routes
        }

    }
    next();
}

function getToken(req, res, next) {

}

function verifyToken(req, res, next) {
    const publicRoutes = ['/api/login', '/api/signup'];
    if (publicRoutes.includes(req.path)) {
        return next(); // Skip middleware for public routes
    }

    if (!req.token) {
        return res.redirect('/api/login'); // Redirect if no token
    }

    const isValid = validateToken(req.token);
    if (!isValid) {
        return res.redirect('/api/login'); // Redirect if token is invalid
    }

    next(); // Token is valid, proceed to the next middleware or route
}


module.exports = {fetchToken  , getToken , verifyToken}