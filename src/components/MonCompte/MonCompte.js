import React from 'react';
import axios from 'axios';

import './MonCompte.css'

const MonCompte = (props) => {

    const suppresionDeCompte = () => {
        axios.delete('http://localhost:3000/api/user/supression/' + localStorage.getItem('userId'), {headers: {Authorization: localStorage.getItem('token')}})
        .then(() => {
            
        })
    }


   return (
       <div className="Conteneur">
           <div className="MonCompte">
                <button onClick={suppresionDeCompte}> Supprimer mon compte </button>
            </div>
            <div className="AVenir">
                <p>Prochainement</p>
            </div>
       </div>
        
    )
}

export default MonCompte;