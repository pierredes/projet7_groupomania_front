import React from 'react';
import { NavLink } from 'react-router-dom';
import ConnecterContext from '../../Context/Context';
import Logo from '../Logo/Logo';


import './header.css';

const header = (props) => {
        return (
            <ConnecterContext.Consumer>
                {(context) => (
                    context.connecter ? context.admin ?
                        <header>
                            <Logo />
                            <nav>
                                <ul>
                                    <li><NavLink to='/' exact > Accueil</NavLink></li>
                                    <li><NavLink to='/creer-post'>Créer un post</NavLink></li>
                                    <li><NavLink to='/mon-compte'>Mon compte </NavLink></li>
                                    <li><NavLink to='/admin'>Admin </NavLink></li>
                                    <li><button onClick={props.click} > Déconnection</button></li>
                                </ul>
                            </nav>
                        </header>
                        : <header>
                        <Logo />
                        <nav>
                            <ul>
                                <li><NavLink to='/' exact > Accueil</NavLink></li>
                                <li><NavLink to='/creer-post'>Créer un post</NavLink></li>
                                <li><NavLink to='/mon-compte'>Mon compte </NavLink></li>
                                <li><button onClick={props.click} > Déconnection</button></li>
                            </ul>
                        </nav>
                    </header>
                    :
                        <header>
                            <Logo />
                            <nav>
                                <ul>
                                    <li><NavLink to='/inscription'> Inscription</NavLink></li>
                                    <li><NavLink to='/connection'>Connection</NavLink></li>
                                </ul>
                            </nav>
                        </header>
                )}
            </ConnecterContext.Consumer>
        )
        
}


export default header;