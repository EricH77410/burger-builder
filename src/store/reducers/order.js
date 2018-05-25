import * as actionType from '../actions/actionTypes';

const initalState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state = initalState, action) => {
  switch(action.type){
    case actionType.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionType.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionType.PURCHASE_BURGER_SUCCESS:
    const newOrder = {
      ...action.orderData,
      id: action.orderId      
    }
      return {
        ...state,
        loading:false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };
    case actionType.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    case actionType.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionType.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case actionType.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loadind: false
      }
    default:
      return state;
  }
}

export default reducer;