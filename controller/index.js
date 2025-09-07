const router = require("../routes/user");
const path = require('path');
const homePageFile = path.join(__dirname, '../views/index.html');
const loginPageFile = path.join(__dirname, '../views/login.html');
const signupPageFile = path.join(__dirname, '../views/signup.html');




function homePage(req , res)
{
    res.sendFile(homePageFile)
}

function loginPage(req , res)
{
    res.sendFile(loginPageFile)
}

function signupPage(req , res)
{
    res.sendFile(signupPageFile)
}

module.exports = {homePage , loginPage , signupPage};