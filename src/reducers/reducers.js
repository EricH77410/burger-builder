import * as actionType from '../actions/actions';

const initState = {
    ingredients:{
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        tomato:0,
        ognon:0
    },
    totalPrice: 4
}

const INGRDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    tomato: 0.5,
    ognon: 0.3
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGRDIENT_PRICES[action.ingredientName]
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGRDIENT_PRICES[action.ingredientName]
            }
        default:
            return state;
    }
}

export default reducer;