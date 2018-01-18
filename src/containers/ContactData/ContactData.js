import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required:true,
                        minLength: 2
                    },
                    valid: false,
                    touched: false
                },
                street:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Address'
                    },
                    value: '',
                    validation: {
                        required:true,
                        minLength: 5
                    },
                    valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZipCode'
                    },
                    value: '',
                    validation: {
                        required:true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                city: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your city'
                    },
                    value: '',
                    validation: {
                        required:true,
                        minLength: 3
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required:true,
                        minLength: 5
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: 'fastest', display:'Fastest'},
                            { value: 'onsite', display: 'On site'}
                        ]
                    },
                    value: '',
                    validation: {},
                    valid: true
                }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    changedHandler = (evt, inputIdentifier) => {
        const newForm = {
            ...this.state.orderForm
        }

        const updatedElem = {
            ...newForm[inputIdentifier]
        }

        updatedElem.value = evt.target.value;
        updatedElem.valid = this.checkValidity(updatedElem.value, updatedElem.validation)
        updatedElem.touched  = true;
        newForm[inputIdentifier] = updatedElem;

        let formIsValid = true;
        for (let field in newForm) {
            formIsValid = newForm[field].valid && formIsValid;
        }
        
        this.setState({orderForm:newForm, formIsValid});
    }

    orderHandler = (evt) => {
        evt.preventDefault();
        this.setState({ loading:true })
        const formData = {};
        for (let element in this.state.orderForm) {
            formData[element] = this.state.orderForm[element].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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
        let orderFields = [];
        for (let key in this.state.orderForm) {
            orderFields.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            { orderFields.map((elem) => {
                return ( <Input 
                    key={elem.id}
                    elementType={elem.config.elementType}
                    elementConfig={elem.config.elementConfig}
                    changed={(evt)=>this.changedHandler(evt, elem.id)}
                    value={elem.config.value}
                    invalid={!elem.config.valid}
                    touched={elem.config.touched}
                    shouldValidate={elem.config.validation}
                    /> )
            }) }
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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
