import React from 'react';
import { NavLink } from 'react-router-dom';


const ConnecterAdmin = (props) => (

    <nav>
        <ul>
            <li><NavLink to='/' exact> Accueil</NavLink></li>
            <li><NavLink to='/creer-post'>Créer un post</NavLink></li>
            <li><NavLink to='/mon-compte'>Mon compte </NavLink></li>
            <li><NavLink to='/admin'>Admin </NavLink></li>
            <li><NavLink to='/deconnexion'>Déconnexion </NavLink></li>
        </ul>
    </nav>
)


export default ConnecterAdmin;