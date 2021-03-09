import React from 'react';

import './Commentaire.css';

const commentaire = (props) => (
    <div className='commentaire'>
        <p>{props.prenom}</p>
        <p>{props.contenu}</p>
        <hr />
    </div>
)

export default commentaire;