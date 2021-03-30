import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Input from '../../components/Input/Input';
import './CreerArticle.css'

class creerArticle extends Component {

    state = {
        titre: '',
        sujet: '',
        contenu: '',
        redirection: false,
        message: '',
        error: ''
    }

    verifier_donnees_article = (texte) => {
        let regex_texte = /^[A-Za-z0-9éèêëç-\s]{2,100}$/;
        if(regex_texte.test(texte) == false) {
            return false;
        }
        else {
            return texte;
        }
    }

    postData = (event) => {
        event.preventDefault();
        if(this.verifier_donnees_article(this.state.titre)) {
            if(this.verifier_donnees_article(this.state.sujet)) {
                let data = {
                    titre: this.state.titre,
                    sujet: this.state.sujet,
                    contenu: this.state.contenu,
                    user_id: localStorage.getItem('userId')
                };
                axios.post('http://localhost:8080/api/post/', data, {headers: {Authorization: localStorage.getItem('token')}})
                    .then(res => {
                       this.setState({ message: res.data.message, titre: '', sujet: "", contenu: '', error: '' })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                this.setState({ error: 'veuillez saisir uniquement du texte d\'au moins 2 caractères pour le sujet de votre article' })
            }
        } else {
            this.setState({ error: 'veuillez saisir uniquement du texte d\'au moins 2 caractères pour le titre de votre article' })
        }
    }

    render() {

        if(this.state.redirection) {
            return <Redirect to='/' />
        }

        let form = (
            <form>
                <Input inputtype='input' type="text" name="titre" placeholder="titre" label='Veuillez renseigner un titre' value={this.state.titre} onChange={(event) => {this.setState({ titre: event.target.value })}} required/>
                <Input inputtype='input' type="text" name="sujet" placeholder="sujet" label='De quoi va parler votre article ?' value={this.state.sujet} onChange={(event) => {this.setState({ sujet: event.target.value })}} />
                <Input inputtype='textarea' type="textarea" name="Contenu" placeholder="Contenu" label='Dites nous en plus sur le sujet !' value={this.state.contenu} onChange={(event) => {this.setState({ contenu: event.target.value })}} />
                <button onClick={this.postData}> Envoyer </button>
                <p className="message_validation">{this.state.error}</p>
            </form>
        )


        return (
            <div>
                <h1> Créer votre article !</h1>
                {form}
                <p className="message_validation">{this.state.message}</p>
            </div>
            
        )
    }
}

export default creerArticle;