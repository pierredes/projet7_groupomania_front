import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Input from '../../components/Input/Input';
import './ModifierArticle.css'

class modifierArticle extends Component {

    state = {
        titre: this.props.location.params.titre,
        sujet: this.props.location.params.sujet,
        contenu: this.props.location.params.contenu,
        error: '',
        redirection: false
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
                };
                axios.put('http://localhost:8080/api/post/modification/' + this.props.match.params.id, data, {headers: {Authorization: localStorage.getItem('token')}})
                    .then(res => {
                        this.setState({ redirection: true });
                    })
                    .catch(error => {
                        this.setState({ error: error.response.data.message })
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
            return <Redirect to="/" />
        }

        let form = (
            <form>
                <Input inputtype='input' type="text" name="titre" placeholder="titre" label='Une erreur dans le titre ? vous pouvez le rectifier !' value={this.state.titre} onChange={(event) => {this.setState({ titre: event.target.value })}} required/>
                <Input inputtype='input' type="text" name="sujet" placeholder="sujet" label='Une erreur dans le sujet ? vous pouvez le rectifier !' value={this.state.sujet} onChange={(event) => {this.setState({ sujet: event.target.value })}} />
                <Input inputtype='textarea' type="textarea" name="Contenu" placeholder="Contenu"  label='Une erreur dans le contenu ? vous pouvez le rectifier !'value={this.state.contenu} onChange={(event) => {this.setState({ contenu: event.target.value })}} />
                <button onClick={this.postData}> Envoyer </button>
                <p className="message_validation">{this.state.error}</p>
            </form>
        )


        return (
            <div>
                <h1> Modifier votre article !</h1>
                {form}
            </div>
            
        )
    }
}

export default modifierArticle;