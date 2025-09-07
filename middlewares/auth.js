const {ref_To_acc_Token, validateToken} = require('../services/auth');
const jwt = require('jsonwebtoken');

async function fetchToken(req, res, next) {
    const token = req.cookies.acc_token?.split(' ')[1];
    if (!token) {
        req.token = false;
        const refToken = req.cookies.ref_token?.split(' ')[1];
        if (!refToken) {
            req.ref_token = false;
        } else {
            try {
                // Generate new access token
                const newToken = await ref_To_acc_Token(refToken);
                req.token = newToken;

                res.cookie('acc_token', newToken, { httpOnly: true, maxAge: 15 * 1000 }); // Update the cookie
            } catch (err) {
                console.error('Error generating new access token:', err);
                return res.status(401).json({ message: 'Invalid refresh token' });
            }
        }
    } else {
        req.token = token;
        const authRoutes = ['/api/login', '/api/signup'];
        if (authRoutes.includes(req.path)) {
            return res.redirect('/api/'); // Skip middleware for public routes
        }
    }
    next();
}
async function getToken(user) {
    const token = await jwt.sign({...user} , process.env.SECRET_KEY, {expiresIn: '15s'})
    return "Bearer " + token ;
}


function verifyToken(req, res, next) {
    const authRoutes = ['/api/login', '/api/signup'];
    if (authRoutes.includes(req.path)) {
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