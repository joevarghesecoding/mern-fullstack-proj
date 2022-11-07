const HttpError = require('../models/http-error');
const uuid = require('uuid');

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire state buldig',
        description: 'desc 1',
        location: {
            lat: 501,
            lng: 1341,
        },
        address: 'address 1',
        creator: 'u1'
    }
];

const getPlaceById =  (req, res, next) => {
    const placeId = req.params.pid; // { pid : 'p1'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if(!place){
      throw new HttpError('Could not find a place for the provided id.', 404);
    } 

    res.json({place}); // => { place } => {place: place}
}

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const user = DUMMY_PLACES.find( u => {
        return u.creator === userId;
    })

    if(!user){
        return next(new HttpError('Could not find a place for the provided user id.', 404));
    }

    res.json({user});
}

const createPlace = function(req, res, next) {
    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = { 
        id: uuid(), 
        title,
        description: description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push( createdPlace ); //unshift if you want to add it first

    res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;