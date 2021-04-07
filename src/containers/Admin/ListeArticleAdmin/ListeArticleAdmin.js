import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ConnecterContext from '../../../Context/Context';
import ListeArticles from '../../ListeArticles/ListeArticles';
import Style from './ListeArticleAdmin.module.css'

class admin extends ListeArticles {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            updatePage: false
        }
    }
    
    static contextType = ConnecterContext;

    componentDidUpdate() {
        if(this.state.updatePage) {
            axios.get('http://localhost:8080/api/post/',  {headers: {Authorization: localStorage.getItem('token')}})
            .then((res) => {
                const posts = res.data.post;
                const postsUpdate = posts.map(article => {
                    return {
                        ...article
                    }
                })
                this.setState({ updatePage: false, articles: postsUpdate })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    supprimerArticle = (id) => {
        axios.delete('http://localhost:8080/api/post/supression/' + id,  {data: {admin: this.context.admin}, headers: {Authorization: localStorage.getItem('token')}})
            .then(() => {
                this.setState({ updatePage: true });
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        let post = null;
        post = this.state.articles.map((article) => {
             return (
                <div className={Style.Article} key={article.id}>
                <Link to={'/' + article.id} >
                    <h3>Titre : {article.titre}</h3>
                    <p>Sujet : {article.sujet}</p>
                    <p> De: {article.utilisateur.prenom} {article.utilisateur.nom}</p>                   
                </Link>
                <button onClick={() => {this.supprimerArticle(article.id)}}> Supprimer </button>
                </div>
            )
        })

        return (
            <ConnecterContext.Consumer>
                {(context) => (
                    context.admin ? 
                        <div>
                            <h1> Bienvenue sur l'interface d'administration</h1>
                            <h2> Voici la liste des posts disponibles !</h2>
                            <button className={Style.Button}><Link to='/admin/commentaire/'>Commentaire</Link></button>
                            <div className={Style.ListeArticle}>
                                {post}
                            </div>
                        </div>
                    :
                    <div>
                        <h1> Veuillez vous connectez en tant qu'admin</h1>
                    </div>
                )}
                
            </ConnecterContext.Consumer>
        )
    }
}
    




export default admin;