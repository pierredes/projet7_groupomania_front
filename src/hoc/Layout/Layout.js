import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import Auxiliaire from '../Auxiliaire/Auxiliaire';

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