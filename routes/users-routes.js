const express = require('express');

const router = express.Router();

const DUMMY_USER = [
    {
        uid: 'u1',
        name : 'name1',
        lname : 'name2',
        email : 'email1'
    }
]

// router.get('/:uid', (req, res, next) => {
//     const userId = req.params.uid;

//     const user = DUMMY_USER.find( u => {
//         return u.uid === userId;
//     })

//     res.json({user});
// });

module.exports = router;