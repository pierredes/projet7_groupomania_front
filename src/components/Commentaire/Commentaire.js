import React from 'react';

import './Commentaire.css';

const commentaire = (props) => (
    <div className='commentaire'>
        <p>Pierre : </p>
        <p>{props.contenu}</p>
        <hr />
    </div>
)

export default commentaire;