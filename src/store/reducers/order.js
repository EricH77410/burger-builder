import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const initalState = {
  orders: [],
  loading: false,
  purchased: false
}

const pusrchaseInit = (state, action) => {
  return updateObject(state, {purchased: false})
}
const purchaseBurgerStart = (state, action) => {
  return updateObject(state,{loading: true})
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {id: action.orderId});
      return updateObject(state, {
        loading:false,
        orders: state.orders.concat(newOrder),
        purchased: true
      });
}

const purchaseBurgerFailed = (state, action) => {
  return updateObject(state, {loading: false});
}

const fetchOrderStart = (state, action ) => {
  return updateObject(state, {loading: true});
}

const fetchOrderSuccess = (state, action ) => {
  return updateObject(state,{
    orders: action.orders,
    loading: false
  });
}

const fetchOrderFail = (state, action ) => {
  return updateObject(state,{loadind: false});
}

const reducer = (state = initalState, action) => {
  switch(action.type){
    case actionType.PURCHASE_INIT: return pusrchaseInit(state, action);
      
    case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
      
    case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
      
    case actionType.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
      
    case actionType.FETCH_ORDERS_START: return fetchOrderStart(state, action);
      
    case actionType.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
            
    case actionType.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
      
    default: return state;
  }
}

export default reducer;