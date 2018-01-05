import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: 'Rico',
        email: 'rico@club.fr',
        address: {
            street: 'rue des fleurs',
            zipcode: '77410'
        },
        loading: false
    }

    orderHandler = (evt) => {
        evt.preventDefault();
        this.setState({ loading:true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email
            },
            deliveryMethod: 'on site'
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false }); 
                this.props.history.push('/');              
            }).catch(error => {
                this.setState({ loading: false });                
            })
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
            <input className={classes.Input} type="text" name="zipcode" placeholder="Your Posta code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        } 
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default  ContactData;
