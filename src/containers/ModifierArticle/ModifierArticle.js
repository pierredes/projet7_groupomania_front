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
        redirection: false
    }

    postData = (event) => {
        event.preventDefault();
        let data = {
            titre: this.state.titre,
            sujet: this.state.sujet,
            contenu: this.state.contenu,
        };
        axios.put('http://localhost:3000/api/post/modification/' + this.props.match.params.id, data)
            .then(res => {
                this.setState({ redirection: true });
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        if(this.state.redirection) {
            return <Redirect to="/" />
        }

        let form = (
            <form>
                <Input inputtype='input' type="text" name="titre" placeholder="titre" label='Une erreur dans le titre ? vous pouvez le rectifier ! (ceci est obligatoire)' value={this.state.titre} onChange={(event) => {this.setState({ titre: event.target.value })}} required/>
                <Input inputtype='input' type="text" name="sujet" placeholder="sujet" label='Une erreur dans le sujet ? vous pouvez le rectifier ! (ceci est obligatoire)' value={this.state.sujet} onChange={(event) => {this.setState({ sujet: event.target.value })}} />
                <Input inputtype='textarea' type="textarea" name="Contenu" placeholder="Contenu"  label='Une erreur dans le contenu ? vous pouvez le rectifier ! (ceci est obligatoire)'value={this.state.contenu} onChange={(event) => {this.setState({ contenu: event.target.value })}} />
                <button onClick={this.postData}> Envoyer </button>
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