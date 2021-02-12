import React from 'react';
import { NavLink } from 'react-router-dom';


import './header.css';

const header = () => (
        <header>
            <h1> Groupomania</h1>
            <nav>
                <ul>
                    <li><NavLink to='/' exact> Accueil</NavLink></li>
                    <li><NavLink to='/creer-post'>Créer un post</NavLink></li>
                </ul>
            </nav>
        </header>
)


export default header;