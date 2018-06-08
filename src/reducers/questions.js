
import * as Types from './../constants/ActionTypes';

var initialState = [];

const questions = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_QUESTION_BY_CODE:
            state = action.questions;
            return [...state]
        default: return [...state]

    }
}

export default questions;