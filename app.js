const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const placesRoutes = require('./routes/places-routes');

const app = express();

app.use(placesRoutes);

app.listen(process.env.PORT);