const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to BirthdayBuddy API")
})

router.use('/auth', require('./auth/index'))
router.use('/birthday', require('./birthday/index'))

module.exports = router;