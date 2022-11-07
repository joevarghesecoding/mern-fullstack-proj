const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json()); //extracts json and converts to js and calls next 

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

app.use( (req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

//error handling code
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An Unknown error occured!'});

});

app.listen(process.env.PORT);