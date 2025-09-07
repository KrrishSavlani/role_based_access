const express = require('express');
const router = express.Router();
const {homePage , loginPage , signupPage,login , signup} = require('../controller/index');

router.get('/',homePage);
router.get('/login', loginPage)
router.get('/signup', signupPage)

router.post('/login', login)
router.post('/signup', signup)

module.exports = router;
