import React, { Component} from 'react';
import { Redirect } from 'react-router-dom';

import Input from '../../components/Input/Input';

class connection extends Component {

    state = {
            email: '',
            password: '',
            error: ''
    }

    render() {

        if(this.props.redirection) {
            return <Redirect to="/" />
        }

        let email = {email: this.state.email}
        let password = {password: this.state.password}

        return (
            <form>
                <Input inputtype='input' type="email" name="email" placeholder="email" value={this.state.email} onChange={(event) => {this.setState({ email: event.target.value })}} required/>
                <Input inputtype='input' type="password" name="password" placeholder="mot de passe" value={this.state.password} onChange={(event) => {this.setState({ password: event.target.value })}} required/>
                <button onClick={
                    (event) => {
                        event.preventDefault()
                        this.props.connection(email, password); 
                    }
                }> Envoyer </button>
                <p>{this.props.erreur} </p>
            </form>

        )
    }
}

export default connection;