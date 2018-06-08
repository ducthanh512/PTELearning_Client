
import * as Types from './../constants/ActionTypes';

var initialState = {id:1,name:'test',price:400};

const itemEditing = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCT:
            // let index = state.findIndex((product) => product.id == action.product.id)
           // state = action.product;
            state = action.product;
            console.log(state)
            return state

        default: return state

    }
}

export default itemEditing;