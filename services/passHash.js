const bcrypt = require('bcrypt');

async function generateHash(password) {
    try
    {
        return await bcrypt.hash(password, 10);
    }
    catch (err)
    {
        console.log(err);
        return err
    }
}

async function verifyHash(userPass, hashedPass) {
    return await bcrypt.compare(userPass, hashedPass);
}

module.exports = {generateHash , verifyHash}