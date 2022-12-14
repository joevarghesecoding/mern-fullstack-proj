import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'Desc 1',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
        address: ' 20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.035837,
            lng: -75.0683708
        },
        creator: 'c1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'Desc 1',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
        address: ' 20 W 34th St., New York, NY 10001',
        location: {
            lat: 40.035837,
            lng: -75.0683708
        },
        creator: 'c2'
    }
]

const UserPlaces = () => {

    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces}/>;
};

export default UserPlaces;