import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../components/Input/Input';
import './CreerArticle.css'

class creerArticle extends Component {

    state = {
        titre: '',
        sujet: '',
        contenu: ''
    }

    postData = () => {
        let data = {
            titre: this.state.titre,
            sujet: this.state.sujet,
            contenu: this.state.contenu
        };
        axios.post('http://localhost:3000/api/post/', data)
            .then(res => {
                return <p> Votre article a bien été crée</p>
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        let form = (
            <form>
                <Input inputtype='input' type="text" name="titre" placeholder="titre" value={this.state.titre} onChange={(event) => {this.setState({ titre: event.target.value })}} required/>
                <Input inputtype='input' type="text" name="sujet" placeholder="sujet" onChange={(event) => {this.setState({ sujet: event.target.value })}} />
                <Input inputtype='textarea' type="textarea" name="Contenu" placeholder="Contenu" onChange={(event) => {this.setState({ contenu: event.target.value })}} />
                <button onClick={this.postData}> Envoyer </button>
            </form>
        )


        return (
            <div>
                <h1> Créer votre article !</h1>
                {form}
            </div>
            
        )
    }
}

export default creerArticle;