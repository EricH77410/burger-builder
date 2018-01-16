import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
//import axios from 'axios'

const withErrorHandler =( WrappedComponent, axios ) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null})
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use( req => req, error => {
                this.setState({ error: error})
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>            
            )
        }
    }
}

export default withErrorHandler;