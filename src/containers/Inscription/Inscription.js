import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../components/Input/Input';

class inscription extends Component {

    state = {
            nom: '',
            prenom: '',
            poste: '',
            email: '',
            password: '',
            message: ''
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
                this.setState({message: res.data.message, nom: '', prenom: '', poste: '', email: '', password: ''});
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>
            <form>
                <Input inputtype='input' type="text" name="nom" placeholder="nom" label="Quel est votre nom ?" value={this.state.nom} onChange={(event) => {this.setState({ nom: event.target.value })}} required/>
                <Input inputtype='input' type="text" name="prenom" placeholder="prenom" label="Et votre prénom ?" value={this.state.prenom} onChange={(event) => {this.setState({ prenom: event.target.value })}} required/>
                <Input inputtype='input' type="text" name="poste" placeholder="poste" label="Quel poste occupez-vous ?" value={this.state.poste} onChange={(event) => {this.setState({ poste: event.target.value })}} required/>
                <Input inputtype='input' type="email" name="email" placeholder="email" label="Avec quelle adresse e-mail voulez-vous vous inscrire ?" value={this.state.email} onChange={(event) => {this.setState({ email: event.target.value })}} required/>
                <Input inputtype='input' type="password" name="password" placeholder="mot de passe" label="Quel va être votre mot de passe ?" value={this.state.password} onChange={(event) => {this.setState({ password: event.target.value })}} required/>
                <button onClick={this.inscription}> Envoyer </button>
            </form>
            <p className="message_validation">{this.state.message}</p>
            </div>
        )
    }
}

export default inscription;