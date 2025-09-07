const router = require("../routes/user");
const User = require("../model/user");

function login(user)
{
    try
    {
        User.find(user.userName && user.password);
        return "success";
    }
    catch (err)
    {
        return err;
    }
}

module.exports = {login};