import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Article from '../../components/Article/Article';

import './ListeArticles.css';

class ListeArticles extends Component {

    state = {
        articles: [],
        selectedPostId: null,
        connecter: false,
        token: localStorage.getItem('token')
    }
    
    componentDidMount() {    
        axios.get('http://localhost:3000/api/post', {headers: {Authorization: this.state.token}})
            .then(res => {
                const postLimite = res.data.post.slice(0,10);
                const listeArticle = postLimite.map(article => {
                    return {
                        ...article
                    };
                })
                this.setState({ articles : listeArticle})
            })
            .catch(error => {
                console.log(error)
            });
        if(localStorage.getItem('token')) {
            this.setState({connecter: true})
        }
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render() {
        let posts = null;

        if(this.state.connecter){
            posts = this.state.articles.map(article => {
                return (
                    <Link to={'/' + article.id} key={article.id}>
                        <Article 
                            titre={article.titre}
                            sujet={article.sujet}
                            contenu={article.contenu.substring(0,300)}
                            nom={article.utilisateur.prenom}
                            click={() => this.postSelectedHandler(article.id)} />
                    </Link>
                )
            })
        }
        else {
            posts =  (
                <p> Pour voir le contenu de cette page veuilez vous connecter</p>
            )
        }

        

        return (
            <div className="listeArticle">
                <h1> Bonjour et bienvenue sur le forum de groupomania</h1>
                {posts}
            </div>
            
        )
    }
}

export default ListeArticles;