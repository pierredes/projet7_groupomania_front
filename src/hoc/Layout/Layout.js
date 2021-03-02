import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header/Header';
import Auxiliaire from '../Auxiliaire/Auxiliaire';
import ConnecterContext from '../../Context/Context';

import './Layout.css';

class layout extends Component {

    render() {

        return (
            <Auxiliaire>
                <Header click={this.props.deconnection} />
                <main >
                    {this.props.children}
                </main>
            </Auxiliaire>
        )
    }
    
}

export default layout;