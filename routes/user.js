const express = require('express');
const router = express.Router();
const {homePage , loginPage , signupPage} = require('../controller/index');

router.get('/',homePage);
router.get('/login', loginPage)
router.get('/signup', signupPage)


module.exports = router;
