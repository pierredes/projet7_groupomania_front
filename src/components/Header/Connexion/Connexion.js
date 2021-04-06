import React from 'react';
import { NavLink } from 'react-router-dom';


const Connexion = (props) => (
    <nav>
        <ul>
            <li><NavLink to='/inscription'> Inscription</NavLink></li>
            <li><NavLink to='/connection'>Connexion</NavLink></li>
        </ul>
    </nav>
)


export default Connexion;