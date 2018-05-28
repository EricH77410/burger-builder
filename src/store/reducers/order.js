import * as actionType from '../actions/actionTypes';
import {updateObject} from '../utility';

const initalState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state = initalState, action) => {
  switch(action.type){
    case actionType.PURCHASE_INIT:
      return updateObject(state, {purchased: false})
    case actionType.PURCHASE_BURGER_START:
      return updateObject(state,{loading: true})
    case actionType.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, {id: action.orderId});
      return updateObject(state, {
        loading:false,
        orders: state.orders.concat(newOrder),
        purchased: true
      });
    case actionType.PURCHASE_BURGER_FAILED:
      return updateObject(state, {loading: false});
    case actionType.FETCH_ORDERS_START:
      return updateObject(state, {loadind: true});
    case actionType.FETCH_ORDERS_SUCCESS:
      return updateObject(state,{
        orders: action.orders,
        loading: false
      });
        
    case actionType.FETCH_ORDERS_FAIL:
      return updateObject(state,{loadind: false});
    default:
      return state;
  }
}

export default reducer;