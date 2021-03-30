import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Article from '../../components/Article/Article';
import ConnecterContext from '../../Context/Context';

import './ListeArticles.css';

class ListeArticles extends Component {

    static contextType = ConnecterContext;

    state = {
        articles: [],
        selectedPostId: null
    }

    componentDidMount() {    
        axios.get('http://localhost:8080/api/post', {headers: {Authorization: localStorage.getItem('token')}})
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
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render() {
        let posts = null;

        if(this.context.connecter){
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
        return (
            <ConnecterContext.Consumer>
                {(context) => (
                    context.connecter ?
                    <div className="listeArticle">
                        <h1> {this.props.titre} </h1>
                        {posts}
                    </div>
                    : <p style={{textAlign: 'center', color: 'red'}}> Pour voir le contenu de cette page veuilez vous connecter</p>
                )}
                
            </ConnecterContext.Consumer>
        )
    }
}

export default ListeArticles;