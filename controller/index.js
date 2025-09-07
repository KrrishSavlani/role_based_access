const router = require("../routes/user");
const path = require('path');
const homePageFile = path.join(__dirname, '../views/index.html');
const loginPageFile = path.join(__dirname, '../views/login.html');
const signupPageFile = path.join(__dirname, '../views/signup.html');
const loginService = require("../services/login");
const signupService = require("../services/signup");



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

function login(req , res)
{
    const newUser = {
        userName: req.body.userName,
        password: req.body.password
    }
    console.log(newUser);
    if(!newUser.userName || !newUser.password){return res.status(401).send("Enter all felids");}
    loginService.login(newUser)
}

async function signup(req , res)
{
    const newUser = {
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
    }
    console.log(newUser);


    if(!newUser.userName || !newUser.password || !newUser.email){return res.status(401).send("Enter all felids");}
    const reply = await signupService.signup(newUser)
    console.log(await reply)
    return res.status(200).send({reply});
}
module.exports = {homePage , loginPage , signupPage , login , signup};
