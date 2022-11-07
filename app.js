const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json()); //extracts json and converts to js and calls next 

app.use('/api/places', placesRoutes);

//error handling code
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An Unknown error occured!'});

});

app.listen(process.env.PORT);