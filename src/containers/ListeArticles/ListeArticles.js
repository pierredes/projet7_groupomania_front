import React, { Component } from 'react';
import axios from 'axios';

import Article from '../../components/Article/Article';

import './ListeArticles.css';

class ListeArticles extends Component {

    state = {
        articles: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/post')
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
        let posts = this.state.articles.map(article => {
            return (
                <Article 
                    titre={article.titre}
                    sujet={article.sujet}
                    contenu={article.contenu}
                    key={article.id} 
                    click={() => this.postSelectedHandler(article.id)} />
            )
        })

        return (
            <div className="listeArticle">
                <h2> test</h2>
                {posts}
            </div>
            
        )
    }
}

export default ListeArticles;