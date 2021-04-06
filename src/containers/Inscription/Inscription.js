import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../components/Input/Input';

class inscription extends Component {

    state = {
            nom: '',
            prenom: '',
            poste: '',
            admin: false,
            email: '',
            password: '',
            confirmation_password: '',
            message: '',
            error: ''
    }

    verifier_donnees_textuel = (texte) => {
        let regex_texte = /^[A-Za-zéèàêëç-\s]{2,50}$/;
        if(regex_texte.test(texte) == false) {
            return false;
        }
        else {
            return texte;
        }
    }

    verifier_donnees_email = (email) => {
        let regex_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regex_email.test(email) == false) {
            return false;
        }
        else {
            return email;
        } 
    }

    inscription = (event) => {
        event.preventDefault();
        if(this.verifier_donnees_textuel(this.state.nom)) {
            if(this.verifier_donnees_textuel(this.state.prenom)) {
                if(this.verifier_donnees_textuel(this.state.poste)) {
                    if(this.verifier_donnees_email(this.state.email)) {
                        if(this.state.password == this.state.confirmation_password) {
                            let data = {
                                nom: this.state.nom,
                                prenom: this.state.prenom,
                                poste: this.state.poste,
                                admin: this.state.admin,
                                email: this.state.email,
                                password: this.state.password,
                            }
                            axios.post('http://localhost:8080/api/authentification/enregistrement/', data)
                                .then(res => {
                                    this.setState({message: res.data.message, nom: '', prenom: '', poste: '', email: '', password: '', confirmation_password: '', error: ''});
                                })
                                .catch(error => {
                                    this.setState({ error: error.response.data.message })
                                })
                        } else {
                            this.setState({ error: 'Vous avez entrer deux mot de passe différents' })
                        }
                    } else {
                        this.setState({ error: 'Veuillez saisir un email correct !' })
                    }
                } else {
                    this.setState({ error: 'veuillez saisir uniquement du texte d\'au moins 2 caractères pour votre poste' });
                }
            } else {
                this.setState({ error: 'veuillez saisir uniquement du texte d\'au moins 2 caractères pour votre prénom' });
            }
        }
        else {
            this.setState({ error: 'veuillez saisir uniquement du texte d\'au moins 2 caractères pour votre nom de famille' });
        } 
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
                <Input inputtype='input' type="password" name="password" placeholder="confirmation de votre mot de passe" label="Confirmez votre mot de passe" value={this.state.confirmation_password} onChange={(event) => {this.setState({ confirmation_password: event.target.value })}} required/>
                <button onClick={this.inscription}> Envoyer </button>
                <p className="message_validation"> {this.state.error} </p>
            </form>
            <p className="message_validation">{this.state.message}</p>
            </div>
        )
    }
}

export default inscription;