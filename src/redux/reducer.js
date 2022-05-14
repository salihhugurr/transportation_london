import {
    ADD_TO_FAV,
    REMOVE_FROM_FAV
} from './action';

const initialState = {
    favorites:[]
};

function favReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_FAV:
            return { ...state, favorites: [...state.favorites, action.payload] };
        case REMOVE_FROM_FAV:
            return {
                ...state,
                favorites: state.favorites.filter(fav => fav.id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default favReducer;