import {combineReducers} from 'redux';
import products from './products'
import itemEditing from './itemEditing'
import categories from './categories'
import category from './category';
import questions from './questions';
import answers from './answers';

const appReducers = combineReducers({
    products,itemEditing,categories,category,questions,answers
})

export default appReducers;