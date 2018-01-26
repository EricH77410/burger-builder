import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../../src/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('https://react-builder.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data});
        //     })
        //     .catch(err=>{
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState = (ingredients) => {
       const sum = Object.keys(ingredients)
        .map (igKey => {
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinue = () => {
        
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('price='+this.props.price)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;       

        let burger =  this.state.error ? <p>Ingredients can't be loaded ...</p>: <Spinner />

        if (this.props.ings) {
            burger = ( 
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemove={this.props.onRemoveIngredient}
                        price={this.props.price}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    /> 
                </Aux>
            )

            orderSummary = <OrderSummary 
                    ingredients={this.props.ings}
                    totalPrice={this.props.price}
                    continue={this.purchaseContinue}
                    cancel={this.purchaseCancelHandler}
                />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient:(ing) => dispatch({type: actions.ADD_INGREDIENT, ingredientName:ing}),
        onRemoveIngredient: (ing) => dispatch({type: actions.REMOVE_INGREDIENT, ingredientName:ing})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));