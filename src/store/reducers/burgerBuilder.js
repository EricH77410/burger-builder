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

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionType.ADD_INGREDIENT:
            const ingredientAdded = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients, ingredientAdded);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGRDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);

        case actionType.REMOVE_INGREDIENT:
            const ingredientRemoved = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
            const updatedIngs = updateObject(state.ingredients, ingredientRemoved);
            const updState = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGRDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updState);
        case actionType.SET_INGREDIENTS:
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
        case actionType.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
            
        default:
            return state;
    }
}

export default reducer;