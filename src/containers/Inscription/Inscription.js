import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../components/Input/Input';

class inscription extends Component {

    state = {
            nom: '',
            prenom: '',
            poste: '',
            email: '',
            password: ''
    }


    inscription = (event) => {
        event.preventDefault();
        let data = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            poste: this.state.poste,
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('http://localhost:3000/api/authentification/enregistrement/', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <form>
                <Input inputtype='input' type="text" name="nom" placeholder="nom" value={this.state.nom} onChange={(event) => {this.setState({ nom: event.target.value })}} required/>
                <Input inputtype='input' type="text" name="prenom" placeholder="prenom" value={this.state.prenom} onChange={(event) => {this.setState({ prenom: event.target.value })}} required/>
                <Input inputtype='input' type="text" name="poste" placeholder="poste" value={this.state.poste} onChange={(event) => {this.setState({ poste: event.target.value })}} required/>
                <Input inputtype='input' type="email" name="email" placeholder="email" value={this.state.email} onChange={(event) => {this.setState({ email: event.target.value })}} required/>
                <Input inputtype='input' type="password" name="password" placeholder="mot de passe" value={this.state.password} onChange={(event) => {this.setState({ password: event.target.value })}} required/>
                <button onClick={this.inscription}> Envoyer </button>
            </form>
        )
    }
}

export default inscription;