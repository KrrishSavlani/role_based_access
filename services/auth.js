const jwt = require('jsonwebtoken')
function isAuthenticated() {

}

async function  ref_To_acc_Token(refToken)
{
    try
    {
        const decoded_ref_token = validateToken(refToken)
        const newToken = await generateToken(decoded_ref_token)
        return "Bearer "+newToken;
    } catch (err) {
        return err;
    }
}

async function generateToken(user)
{
    const token = await jwt.sign({...user} , process.env.SECRET_KEY);
    return token ;
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


module.exports = {isAuthenticated , generateToken , validateToken , ref_To_acc_Token}
