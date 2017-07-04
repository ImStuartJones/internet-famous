import * as types from '../constants/actionTypes';

export function addRedSuccess(value) {
    return { type: types.ADD_RED_SUCCESS, redScore: value };
}

export function addRed() {
    return dispatch => {
        dispatch(addRedSuccess(1));
    };
}
