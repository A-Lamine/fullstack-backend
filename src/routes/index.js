const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const checkoutRouter = require('./checkout.route');

router.use('/users/',usersRouter);
router.use('/checkout',checkoutRouter);


module.exports = router;