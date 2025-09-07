const jwt = require('jsonwebtoken')
function isAuthenticated() {

}

function generateToken()
{

}

function validateToken(token)
{
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded) {
            return false;
        }
        else {
            return true;
        }
    }catch (err)
    {
        return false
    }

}


module.exports = {isAuthenticated , generateToken , validateToken}
