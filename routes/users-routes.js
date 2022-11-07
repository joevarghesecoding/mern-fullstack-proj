const express = require('express');
const userController = require('../controllers/users-controller');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/signup',
[
    check('name').notEmpty(),
    check('lname').optional().notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6})
]
, userController.signUp);
router.post('/login',
[
    check('email').normalizeEmail().isEmail(),
    check('password').notEmpty()
], 
userController.logIn);

module.exports = router;