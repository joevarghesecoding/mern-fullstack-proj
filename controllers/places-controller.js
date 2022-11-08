const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

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
const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid; // { pid : 'p1'}
    let place;

    try{
         place = await Place.findById(placeId);
    }catch ( err ) {
        const error = new HttpError(
            'Something went wrong, could not find a place',
            500
        );
        return next(error);
    }


    if(!place){
      const error = new HttpError('Could not find a place for the provided id.', 
      404
    );
      return next(error);
    } 

    res.json({ place: place.toObject( { getters: true }) }); // => { place } => {place: place}
};

//GET gets places with a user Id
const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let places;

    try{
         places = await Place.find( { creator: userId });
    } catch ( err ) {
        const error = new HttpError(
            'Something went wrong, could not find user',
            500
        );
        return next(error);
    }

    if(!places || places.length === 0){
        return next(
            new HttpError('Could not find places for the provided user id.', 404)
        );
    }

    res.json({ places : places.map( place => place.toObject( {
        getters: true
    })) });
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
    

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=',
        creator
    });

    // DUMMY_PLACES.push( createdPlace ); //unshift if you want to add it first

    try{
        await createdPlace.save();
    } catch ( err ) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        )
        return next(error);
    }
   
    res.status(201).json({ place: createdPlace });
};

//PATCH Updates place 
const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid changes passed, please check', 422);
    }

   const placeId = req.params.pid;
   const { title, description, address } = req.body;

   let place;
   try{
        place = await Place.findById(placeId);
   } catch ( err ){
        const error = new HttpError(
            'Could not find place for updating',
            500
        );
        return next(error);
   }

   if(title)
        place.title = title;
   if(description)
        place.description = description;
   if(address)
   {
        place.address = address;
        let coordinates;
        try{
            coordinates = await getCoordsForAddress(address);
        } catch (error) {
            return next(error);
        }
        place.location = coordinates;
   }
        
   
    try {
        await place.save();
    } catch ( err ) {
        const error = new HttpError(
            'Could not update place',
            500
        );
        return next(error);
    }

   
   res.status(200).json({ place: place.toObject({ getters: true }) });
};

//DELETE deletes a place by id
const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId);
    } catch ( err ) {
        const error = new HttpError(
            'Could not delete place',
            500
        );
        return next(error);
    }
   
    try{
        await place.remove();
    } catch ( err ) {
        const error = new HttpError(
            'Could not delete place',
            500
        );
        return next(error);
    }
    
    res.status(200).json({ message: 'Deleted place.'});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;