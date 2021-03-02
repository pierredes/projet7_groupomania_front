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
        message: ''
    }

    postData = (event) => {
        event.preventDefault();
        let data = {
            titre: this.state.titre,
            sujet: this.state.sujet,
            contenu: this.state.contenu
        };
        axios.post('http://localhost:3000/api/post/', data)
            .then(res => {
                // this.setState({ redirection: true })
               this.setState({ message: res.data.message })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        if(this.state.redirection) {
            return <Redirect to='/' />
        }

        let form = (
            <form>
                <Input inputtype='input' type="text" name="titre" placeholder="titre" label='Veuillez renseigner un titre (ceci est obligatoire)' value={this.state.titre} onChange={(event) => {this.setState({ titre: event.target.value })}} required/>
                <Input inputtype='input' type="text" name="sujet" placeholder="sujet" label='De quoi va parler votre article ? (ceci est obligatoire)' onChange={(event) => {this.setState({ sujet: event.target.value })}} />
                <Input inputtype='textarea' type="textarea" name="Contenu" placeholder="Contenu" label='Dites nous en plus sur le sujet ! (ceci est obligatoire)' onChange={(event) => {this.setState({ contenu: event.target.value })}} />
                <button onClick={this.postData}> Envoyer </button>
            </form>
        )


        return (
            <div>
                <h1> Créer votre article !</h1>
                {form}
                {this.state.message}
            </div>
            
        )
    }
}

export default creerArticle;