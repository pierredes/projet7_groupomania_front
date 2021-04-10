import React from 'react';
import axios from 'axios';

import './MonCompte.css'

const MonCompte = (props) => {

    const suppresionDeCompte = () => {
        axios.delete('http://localhost:8080/api/user/supression/', {headers: {Authorization: localStorage.getItem('token')}})
        .then(() => {
            props.supression()
        })
    }

   return (
       <div className="Conteneur">
           <div className="MonCompte">
                <button onClick={() => {suppresionDeCompte()}}> Supprimer mon compte </button>
            </div>
       </div>
        
    )
}

export default MonCompte;