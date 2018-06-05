import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    ingredients:null,
    totalPrice: 4,
    error: false
}

const INGRDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    tomato: 0.5,
    ognon: 0.3
}

// Refactor reducer
const addIngredient = (state, action) => {
    const ingredientAdded = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, ingredientAdded);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGRDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngrdient = (state, action) => {
    const ingredientRemoved = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updateObject(state.ingredients, ingredientRemoved);
    const updState = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGRDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updState);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            ognon: action.ingredients.ognon,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
            tomato: action.ingredients.tomato
        },
        totalPrice: 4,
        error: false
    })
}

const fetchIngrdientsFailed = (state, action) => {
    return updateObject(state, {error: true});
}

const reducer = (state = initState, action) => {
    switch(action.type) {

        case actionType.ADD_INGREDIENT: return addIngredient(state,action);

        case actionType.REMOVE_INGREDIENT: return removeIngrdient(state,action);
            
        case actionType.SET_INGREDIENTS: return setIngredients(state, action)
            
        case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngrdientsFailed(state, action);            
            
        default: return state;
    }
}

export default reducer;