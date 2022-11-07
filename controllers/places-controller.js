const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const getCoordsForAddress = require('../util/location');

let DUMMY_PLACES = [
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

//GET gets places from ID
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

//GET gets places with a user Id
const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter( u => {
        return u.creator === userId;
    })

    if(!places || places.length === 0){
        return next(
            new HttpError('Could not find places for the provided user id.', 404)
            );
    }

    res.json({places});
}

//POST Creates a place
const createPlace = async function(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }
    
    const { title, description, address, creator } = req.body;

    let coordinates;
    try{
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }
    

    const createdPlace = { 
        id: uuidv4(), 
        title,
        description: description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push( createdPlace ); //unshift if you want to add it first

    res.status(201).json({ place: createdPlace });
};

//PATCH Updates place 
const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid changes passed, please check', 422);
    }

   const placeId = req.params.pid;
   const { title, description, address } = req.body;

   const updatedPlace = { ...DUMMY_PLACES.find( 
    p => p.id === placeId
   )}
   const placeIndex = DUMMY_PLACES.findIndex(
    p => p.id === placeId
   )
   
   if(title)
    updatedPlace.title = title;
   if(description)
    updatedPlace.description = description;
   if(address)
    updatedPlace.address = address;
   
   DUMMY_PLACES[placeIndex] = updatedPlace;
   res.status(200).json({ place: updatedPlace });
};

//DELETE deletes a place by id
const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p => p.id === placeId)){
        throw new HttpError('Could not find place to delete', 404);
    }

    DUMMY_PLACES = DUMMY_PLACES.filter( p => p.id !== placeId);
    res.status(200).json({ message: 'Deleted place.'});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;