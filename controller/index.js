const router = require("../routes/user");
const path = require('path');
const homePageFile = path.join(__dirname, '../views/index.html');
const loginPageFile = path.join(__dirname, '../views/login.html');
const signupPageFile = path.join(__dirname, '../views/signup.html');
const loginService = require("../services/login");
const signupService = require("../services/signup");


//this is the handler which will serve the home page
function homePage(req , res)
{
    res.sendFile(homePageFile)
}

//this is the handler which will serve the login page
function loginPage(req , res)
{
    res.sendFile(loginPageFile)
}

//this is the handler which will serve the signup page
function signupPage(req , res)
{
    res.sendFile(signupPageFile)
}

//this is the handler which will handle the login logic
async function login(req, res) {
    const newUser = {
        userName: req.body.userName,
        password: req.body.password
    };
    console.log(newUser);

    if (!newUser.userName || !newUser.password) {
        return res.status(401).json({ message: "Enter all fields" });
    }

    const response = await loginService.login(newUser);

    if (response === "success") {
        //jwt token can be generated here and sent to the client
        const acc_token = await loginService.generateToken(newUser);
        const ref_token = await loginService.generateToken({...newUser, tokenType: 'refresh'});
        console.log(acc_token)
        console.log(ref_token)
        res.cookie('acc_token', acc_token, { httpOnly: true , maxAge: 15 * 1000 }); // Set cookie to expire in 15 seconds
        res.cookie('ref_token' , ref_token , {httpOnly: true , maxAge: 7 * 24 * 60 * 60 * 1000}); // Set cookie to expire in 7 days

        return res.status(200).json({ message: "Login successful", redirectUrl: "/api/" });
    }

    console.log(response);
    return res.status(400).json({ message: response });
}



//this is the handler which will handle the signup logic
async function signup(req , res)
{
    const newUser = {
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
    }

    if(!newUser.userName || !newUser.password || !newUser.email){return res.status(401).send("Enter all felids");}

    console.log(newUser);
    const reply = await signupService.signup(newUser)
    console.log(await reply)
    return res.status(200).send({reply});
}
module.exports = {homePage , loginPage , signupPage , login , signup};
