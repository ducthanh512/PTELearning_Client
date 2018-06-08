
import * as Types from './../constants/ActionTypes';

var initialState = [];

const products = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            state = action.products;
            return [...state]

        case Types.ADD_PRODUCT:
            state.push(action.product);
            return [...state]

        case Types.DELETE_PRODUCT:
            let index = state.findIndex((product) => product.id === action.id)
            state.splice(index, 1)
            return [...state]


        case Types.UPDATE_PRODUCT:
            console.log(action.product);
            index = state.findIndex((product) => product.id === action.product.id)
            state[index].name = action.product.name;
            state[index].price = action.product.price;
            state[index].status = action.product.status;

            return [...state]


        default: return [...state]

    }
}

export default products;