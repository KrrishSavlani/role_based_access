const express = require('express');
const router = express.Router();
const {homePage , loginPage , signupPage,login , signup} = require('../controller/index');

router.get('/',homePage);
router.get('/login', loginPage) //this will serve the login page
router.get('/signup', signupPage) //this will serve the signup page

router.post('/login', login) // this will handle the login logic
router.post('/signup', signup) // this will handle the signup logic

module.exports = router;
