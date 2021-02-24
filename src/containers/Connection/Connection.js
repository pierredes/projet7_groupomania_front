import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Input from '../../components/Input/Input';

class connection extends Component {

    state = {
            email: '',
            password: '',
            redirection: false,
            connecter: false,
            token: null
    }


    connection = (event) => {
        event.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('http://localhost:3000/api/authentification/connection/', data)
            .then(res => {
                const token = res.data.token.split('.')[1];
                localStorage.setItem('token', token);
                this.setState({ redirection: true, connecter: true, token: token  } )
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {

        if(this.state.redirection) {
            return <Redirect to={{pathName: '/', state: { connecter: this.state.connecter, token: this.state.token}}}  />
        }
        return (
            <form>
                <Input inputtype='input' type="email" name="email" placeholder="email" value={this.state.email} onChange={(event) => {this.setState({ email: event.target.value })}} required/>
                <Input inputtype='input' type="password" name="password" placeholder="mot de passe" value={this.state.password} onChange={(event) => {this.setState({ password: event.target.value })}} required/>
                <button onClick={this.connection}> Envoyer </button>
            </form>

        )
    }
}

export default connection;