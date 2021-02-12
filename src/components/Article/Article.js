import React from 'react';

import './Article.css';

const article = (props) => (
        <section className="article" onClick={props.click}>
            <h2>{props.titre}</h2>
            <h4>{props.sujet}</h4>
            <p>{props.contenu}</p>
        </section>
)

export default article;