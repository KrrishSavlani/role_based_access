const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Fixed spelling
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const user = {name : "krrish" , age : 20 , role : "admin"};
function generateToken(){
    const token = jwt.sign({...user} , process.env.SECRET_KEY);
    return "Bearer " + token ;
}

function verifyToken(token)
{
    if(jwt.verify(token , process.env.SECRET_KEY)){
        return true;
    }
    else {
        return false;
    }
}

function verifyAdmin(token)
{
    try {
        const decodedToken = jwt.decode(token, process.env.SECRET_KEY)
        console.log(decodedToken.role);
        if(decodedToken.role !== "admin") {caches("you are not authorized"); return false;}
        else return true;
    }catch (err) {
        return null;
    }
}

app.get('/',function(req,res){
    const token = generateToken();
    res.cookie('token', token, { httpOnly: true});
    res.send("Hello World");
})

app.get("/admin"  , (req  , res) => {

    const token = req.cookies.token?.split(' ')[1];
    if(!token){res.redirect('login')}
    else if(!verifyToken(token)){res.redirect('login')}
    else {
        if(!verifyAdmin(token)) { return res.send("you are not authorized")}
        else {
            res.status(200).send("welcome to the admin page");
        }
    }
})

app.get('/login', (req,res)=>{
    res.send("login page");
})

app.post('/',function(req,res){
    const token = req.cookies.token.split(" ")[1];
    if(!token){
        return res.status(401).send("Unauthorized");
    }else if(!verifyToken(token)){ res.status(401).send("Unauthorized");}
    else {
        res.status(200).send("welcome to the private route");
    }
})

app.listen(3000 , ()=>{
    console.log("Server started on port http://localhost:3000");
})