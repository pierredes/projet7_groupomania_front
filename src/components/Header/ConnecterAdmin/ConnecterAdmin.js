import React from 'react';
import { NavLink } from 'react-router-dom';


const ConnecterAdmin = (props) => (

    <nav className='topnav'>
        <ul>
            <li><NavLink to='/' exact className="nav-item nav-link" > Accueil</NavLink></li>
            <li><NavLink to='/creer-post' className="nav-item nav-link">Créer un post</NavLink></li>
            <li><NavLink to='/mon-compte' className="nav-item nav-link">Mon compte </NavLink></li>
            <li><NavLink to='/admin' className="nav-item nav-link">Admin </NavLink></li>
            <li><NavLink to='/deconnexion' className="nav-item nav-link">Déconnexion </NavLink></li>
        </ul>
    </nav>
)


export default ConnecterAdmin;