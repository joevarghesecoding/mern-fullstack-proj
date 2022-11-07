const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

let DUMMY_USER = [
    {
        uid: 'u1',
        name : 'name1',
        lname : 'name2',
        email : 'email1',
        password: 'pass123'
    }
]

const getAllUsers = (req, res, send) => {
    res.status(201).json({ DUMMY_USER });
}

const signUp = (req, res, send) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid input entries, please check', 422);
    }

    const { name, lname, email, password } = req.body;

    const hasUser = DUMMY_USER.find( u => u.email === email);
    if( hasUser ){
        throw new HttpError('Could not create user, email already exists.', 422);
    }
    
    const newUser = {
        uid: uuidv4(),
        name,
        lname,
        email,
        password
    }

    DUMMY_USER.push( newUser );

    res.status(201).json({ message: 'User created '});
}

const logIn = (req, res, send) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid login inputs, please check', 422);
    }

    const { email, password } = req.body;

    const found = DUMMY_USER.find( 
        u => u.email === email
    );

    if(!found || found.password !== password){
       throw new HttpError('Count not identify user', 401);
    }

    
    res.status(200).json({ message: 'Login Successful '});
}

exports.getAllUsers = getAllUsers;
exports.signUp = signUp;
exports.logIn = logIn;