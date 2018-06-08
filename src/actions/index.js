import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller'

export const actFetchProductsRequest = () =>{
    return (dispatch) =>{
        return callApi('products','GET',null).then(res =>{
            dispatch(actionFetchProducts(res.data))
        })

    }
}

export const actionFetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products,
    }
}

export const actionAddProductRequest = (product) =>{
    console.log('add new');
    const newProduct = {
        name: product.name,
        price:product.price,
        status:product.status,
    }
    return (dispatch) =>{
        return callApi('products','POST',newProduct).then(res =>{
            dispatch(actionAddProduct(res.data))
        })

    }
}

export const actionAddProduct = (product) => {
    return {
        type: Types.ADD_PRODUCT,
        product,
    }
}




export const actionDeleteProductRequest = (id) =>{
    return (dispatch) =>{
        return callApi(`products/${id}`,'DELETE',null).then(res =>{
            dispatch(actionDeleteProduct(id))
        })

    }
}

export const actionDeleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id,
    }
}



export const actionUpdateProductRequest = (product) =>{
    var id = product.id;
    return (dispatch) =>{
        return callApi(`products/${id}`,'PUT',product).then(res =>{
            dispatch(actionUpdateProduct(res.data))
        })

    }
}

export const actionUpdateProduct = (product) => {
    console.log(product);
    
    return {
        type: Types.UPDATE_PRODUCT,
        product,
    }
}


export const actionEditProductRequest = (product) =>{
    return (dispatch) =>{
        return callApi(`products/${product.id}`,'GET',null).then(res =>{
            dispatch(actionEditProduct(res.data))
        })

    }
}

export const actionEditProduct = (product) => {
    return {
        type: Types.FETCH_PRODUCT,
        product,
    }
}


// Starting PTE ********************************************************************

export const actGetCategoriesRequest = () =>{
    return (dispatch) =>{
        return callApi('ptelearning/categories/','GET',null).then(res =>{
            dispatch(actGetCategories(res.data))
        })

    }
}

export const actGetCategories = (categories) => {
    return {
        type: Types.GET_CATEGORIES,
        categories,
    }
}



export const actGetQuestionByCodeRequest = (code) =>{
    
    return (dispatch) =>{
        return callApi(`ptelearning/questions/${code}`,'GET',null).then(res =>{
            dispatch(actGetQuestionByCode(res.data))
        })

    }
}

export const actGetQuestionByCode = (questions) => {
    return {
        type: Types.GET_QUESTION_BY_CODE,
        questions,
    }
}



export const actGetAnswerByCodeRequest = (code) =>{
    
    return (dispatch) =>{
        return callApi(`ptelearning/answers/${code}`,'GET',null).then(res =>{
            dispatch(actGetAnswerByCode(res.data))
        })

    }
}

export const actGetAnswerByCode = (answers) => {
    return {
        type: Types.GET_ANSWER_BY_CODE,
        answers:answers,
    }
}

