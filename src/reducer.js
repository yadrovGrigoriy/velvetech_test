const initialState = {
    products: [],
    categories: [],
    authUser: '',
    users: []
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SUBMIT_FORM':
            return {
                ...state
            };

        default:
            return state;
    }
}
