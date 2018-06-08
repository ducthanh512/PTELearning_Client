
import * as Types from './../constants/ActionTypes';

var initialState = [];

const answers = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ANSWER_BY_CODE:
            state = action.answers;
            return [...state]
        default: return [...state]

    }
}

export default answers;