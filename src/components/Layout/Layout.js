import React from 'react';

import Header from '../Header/Header';
import Auxiliaire from '../../hoc/Auxiliaire/Auxiliaire';

import './Layout.css';

const layout = (props) => {
    return (
        <Auxiliaire>
            <Header />
            <main>
                {props.children}
            </main>
        </Auxiliaire>
    )
}

export default layout;