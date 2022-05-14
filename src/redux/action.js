export const ADD_TO_FAV = 'ADD_TO_FAV';
export const REMOVE_FROM_FAV = 'REMOVE_FROM_FAV';

export const addFav = fav => dispatch => {
    dispatch({
        type: ADD_TO_FAV,
        payload: fav
    });
};

export const removeFav = fav => dispatch => {
    dispatch({
        type: REMOVE_FROM_FAV,
        payload: fav
    });
};