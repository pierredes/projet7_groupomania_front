import React from 'react';

import './Article.css';

const article = (props) => props.article.map(article => {
    return (
        <section key={article.id} className="article">
            <h2>{article.titre}</h2>
            <h4>{article.sujet}</h4>
            <p>{article.contenu}</p>
        </section>
    )
})
    



export default article;