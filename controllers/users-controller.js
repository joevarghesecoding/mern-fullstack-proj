const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const User = require('../models/user');

// let DUMMY_USER = [
//     {
//         uid: 'u1',
//         name : 'name1',
//         lname : 'name2',
//         email : 'email1',
//         password: 'pass123'
//     }
// ]

const getAllUsers = (req, res, send) => {
    res.status(201).json({ DUMMY_USER });
}

const signUp = async (req, res, send) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return next(HttpError('Invalid input entries, please check', 422));
    }

    const { name, email, password, places } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch ( err ) {
        const error = new HttpError(
            'Signing up Failed, please try again later.',
            500
        );
        return next(error);
    }

    if(existingUser){
        const error = new HttpError(
            'User existing already, please login instead.',
            422
        );
        return next(error);
    }
     
    
    const newUser = new User({
        name,
        email,
        image: 'https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=',
        password,
        places
    });

    try{
        await newUser.save();
    }catch ( err ) {
        const error = new HttpError(
            'Sign up failed, please try again.',
            500
        )
        return next(error);
    }

    res.status(201).json({ user: newUser.toObject({ getters: true })});
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