const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { connectMongo } = require('./config/mongo');
const user = require('./routes/user');
const app = express();
const { fetchToken, verifyToken } = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());
dotenv.config();

connectMongo(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}?authSource=admin`)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => { console.log(err) });


app.use(fetchToken)
app.use(verifyToken)

app.use('/api' , user)


app.listen(process.env.PORT, () => {
    console.log("Server started on port http://localhost:" + process.env.PORT);
})