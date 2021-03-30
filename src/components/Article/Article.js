import React from 'react';

import './Article.css';

const article = (props) => (
        <section className="article" onClick={props.click}>
            <p className="auteur">de : {props.nom}</p>
            <h2 className="titre">{props.titre}</h2>            
            <h3 className="sujet">{props.sujet}</h3>
            <p className="contenu">{props.contenu}</p>
        </section>
)

export default article;