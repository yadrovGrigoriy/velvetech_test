import axios from 'axios';

const initialState = {
    showModal: false,
    authUser: '',
    products: [],
    categories: [],
    users: []
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                authUser: action.payload
            };
        case 'SET_STATE_MODAL':
            return {
                ...state,
                showModal: action.payload
            };
        case 'SET_STATE':
            return {
                ...state,
                [action.payload.item]: action.payload.data
            };

        default:
            return state;
    }
}

const userAuth = (users, user) => {
    const foundUser = users.find(el => el.email === user.email && el.password === user.password);

    if (foundUser) {
        foundUser.isAuth = true;
        users = users.filter(el => el.id !== user.id);
        users.push(foundUser);
        return users;
    }
};
