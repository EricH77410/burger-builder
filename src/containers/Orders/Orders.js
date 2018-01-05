import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data);
                let data = [];
                for (let key in res.data) {
                    data.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({orders:data, loading:false})

            })
            .catch(err => {
                console.log(err);
                this.setState({loading:false});
            })
    }
    render() {
        let orders = <Spinner />
        if (this.state.orders) {
            orders = this.state.orders.map((order) => {
                return <Order ingredients={order.ingredients} key={order.id} price={order.price}/>
            })
        } 
        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);
