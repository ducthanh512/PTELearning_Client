
import * as Types from './../constants/ActionTypes';

var initialState = [];

const categories = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_CATEGORIES:
            state = action.categories;
            return [...state]
        default: return [...state]

    }
}

export default categories;