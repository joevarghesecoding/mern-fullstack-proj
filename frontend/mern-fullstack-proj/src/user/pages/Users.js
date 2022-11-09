import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [{
        id: 'u1',
        name: 'name1',
        image: 'https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=612x612&w=0&k=20&c=RkcUiEmZYarBPnQW8qm7GUJEegE24Molcl2ijMlY3kQ=',
        places: 3
    }];

    return <UsersList items={USERS}/>;
};

export default Users;