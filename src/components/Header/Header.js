import React from 'react';
import { NavLink } from 'react-router-dom';
import ConnecterContext from '../../Context/Context';
import Logo from '../Logo/Logo';

import ConnecterAdmin from './ConnecterAdmin/ConnecterAdmin';
import ConnecterNonAdmin from './ConnecterNonAdmin/ConnecterNonAdmin';
import Connexion from './Connexion/Connexion';
import './header.css';

const header = (props) => {
        return (
            <ConnecterContext.Consumer>
                {(context) => (
                    context.connecter ? context.admin ?
                        <header>
                            <Logo />
                            <ConnecterAdmin />
                        </header>
                        : <header>
                        <Logo />
                        <ConnecterNonAdmin />
                    </header>
                    :
                        <header>
                            <Logo />
                            <Connexion />
                        </header>
                )}
            </ConnecterContext.Consumer>
        )
        
}


export default header;