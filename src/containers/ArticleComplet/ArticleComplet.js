import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import Commentaire from '../../components/Commentaire/Commentaire';
import Input from '../../components/Input/Input';
import ConnecterContext from '../../Context/Context';


import './ArticleComplet.css';

class ArticleComplet extends Component {

    static contextType = ConnecterContext 

    state = {
        articleCharger: null,
        commentaire: [],
        redirection: false,
        commenter: '',
        updateComentaire: false,
        error: ''
    }

    componentDidMount () {
        if ( this.props.match.params.id ) {
            if ( !this.state.articleCharger || (this.state.articleCharger && this.state.articleCharger.id !== this.props.id) ) {
                axios.get( 'http://localhost:8080/api/post/' + this.props.match.params.id, {headers: {Authorization: localStorage.getItem('token')}} )
                    .then( res => {
                        this.setState({ articleCharger: res.data.post })
                    });
            }
        }

        if ( this.props.match.params.id ) {
            if ( !this.state.articleCharger || (this.state.articleCharger && this.state.articleCharger.id !== this.props.id) ) {
                axios.get( 'http://localhost:8080/api/commentaire/' + this.props.match.params.id, {headers: {Authorization: localStorage.getItem('token')}})
                    .then( res => { 
                        const commentaireRecent = res.data.commentaire;
                        const recupereCommentaireRecent = commentaireRecent.map(commentaire => {
                            return {
                                ...commentaire
                            }
                        })
                        this.setState({ commentaire: recupereCommentaireRecent})
                    });
            }
        }
        
    }

    componentDidUpdate() {
        if ( this.props.match.params.id ) {
            if ( !this.state.articleCharger || (this.state.articleCharger && this.state.articleCharger.id !== this.props.id) ) {
                if(this.state.updateComentaire) {
                    axios.get( 'http://localhost:8080/api/commentaire/' + this.props.match.params.id, {headers: {Authorization: localStorage.getItem('token')}})
                    .then( res => {
                        const commentaireRecent = res.data.commentaire;
                        const recupereCommentaireRecent = commentaireRecent.map(commentaire => {
                            return {
                                ...commentaire
                            }
                        })
                        this.setState({ commentaire: recupereCommentaireRecent, updateComentaire: false})
                    });
                }
                
            }
        }
    }
    

    supprimerArticle = () => {
        axios.delete('http://localhost:8080/api/post/supression/' + this.props.match.params.id, {headers: {Authorization: localStorage.getItem('token')}})
            .then(() => {
                this.setState({ redirection: true })
            })
            .catch(error => {
                this.setState({error: error.response.data.message })
            })
    }

    postCommentaire = (event) => {
        event.preventDefault();
        let data = {
            contenu: this.state.commenter,
            user_id: localStorage.getItem('userId'),
            post_id: this.props.match.params.id
        }
        axios.post('http://localhost:8080/api/commentaire', data, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
                this.setState({ commenter: data.contenu, updateComentaire: true })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let post = null
        if ( this.state.articleCharger ) {
            post = (
                <div className="article-complet">
                    <h1>{this.state.articleCharger.titre}</h1>
                    <h2>{this.state.articleCharger.sujet}</h2>
                    <p>{this.state.articleCharger.contenu}</p>
                    <Link to={{
                        pathname:'/modifier/' + this.props.match.params.id,
                        params:{
                            titre: this.state.articleCharger.titre,
                            sujet: this.state.articleCharger.sujet,
                            contenu: this.state.articleCharger.contenu
                        }
                    }}><button> Modifier </button></Link> 
                    <button onClick={this.supprimerArticle}> Supprimer </button>
                </div>
            );
        }
        
        let commentaire = null;

        if ( this.state.commentaire ) {
            commentaire = this.state.commentaire.map(contenuCommentaire => {
                return <Commentaire prenom={contenuCommentaire.utilisateur.prenom} contenu={contenuCommentaire.contenu} key={contenuCommentaire.id} />
            })

        }

        if(this.state.redirection) {
            return <Redirect to="/" />
        }

      
        return (
            <div className='page_article_complet'>
                {post}
                <p className="message_validation">{this.state.error}</p>
                <div className="commenter">
                    <h2 style={{color: 'white'}}> Commenter </h2>
                    <Input inputtype='textarea' type="text" name="commenter" placeholder="commenter" onChange={(event) => {this.setState({ commenter: event.target.value })}} required/>
                    <button onClick={this.postCommentaire}> Commenter </button>
                </div>
                <section className="listeCommentaire">
                    {commentaire}
                </section>
                
            </div>
            
        )       

    }
}

export default ArticleComplet;

