import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../components/Input/Input';
import './Commenter.css';

class commenter extends Component {

    state = {
        commenter: ''
    }

    postCommentaire = () => {
        let data = {
            contenu: this.state.commenter
        }
        axios.post('http://localhost:3000/api/commentaire', data)
            .then(res => {
                // this.setState({ commenter: '' })
                document.location.reload()

            })
            .catch(error => {
                console.log(error)
            })
    }

    render () {

        return (
            <div className="commenter">
                <h2> Commenter </h2>
                <Input inputtype='input' type="text" name="commenter" placeholder="commenter" value={this.state.commenter} onChange={(event) => {this.setState({ commenter: event.target.value })}} required/>
                <button onClick={this.postCommentaire}> Commenter </button>
            </div>
        )
    }
}

export default commenter;