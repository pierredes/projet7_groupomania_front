import React, { Component } from 'react';
import axios from 'axios';


import './App.css';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import ListeArticles from './containers/ListeArticles/ListeArticles';
import ArticleComplet from './containers/ArticleComplet/ArticleComplet';
import CreerArticle from './containers/CreerArticle/CreerArticle';
import ModifierArticle from './containers/ModifierArticle/ModifierArticle';
import inscription from './containers/Inscription/Inscription';
import Connection from './containers/Connection/Connection';
import ConnecterContext from './Context/Context';


class App extends Component {

  state = {
    redirection: false,
    connecter: false,
    token: null,
    redirection: false
  }

  connection = (email, password) => {
    const jwt = require('jsonwebtoken');
    let data = {
        email: Object.values(email)[0],
        password: Object.values(password)[0]
    }
    axios.post('http://localhost:3000/api/authentification/connection/', data)
        .then(res => {
            const token = res.data.token;
            localStorage.setItem('token', token);
            const userId = jwt.decode(token);
            localStorage.setItem('userId', userId.userId )
            this.setState({ redirection: true, connecter: true, token: token});
        })
        .catch(err => {
            console.log(err)
        })
  }

  deconnection = () => {
    this.setState({ connecter: false, token: null, redirection: false})
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}


  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.setState({connecter: true, token: localStorage.getItem('token')})
    }
  }
  render () {

    return (
      <BrowserRouter>
      <ConnecterContext.Provider value={{connecter: this.state.connecter, token: this.state.token}}>
      <Layout deconnection={this.deconnection}>
      <div className="App">
        
          <Switch>
            <Route path='/inscription' component={inscription} />
            <Route path='/connection' render={(props) => (<Connection connection={this.connection} redirection={this.state.redirection} />)} />
            <Route path='/creer-post' component={CreerArticle}/>
            <Route path='/' exact component={ListeArticles} />
            <Route path='/:id' exact component={ArticleComplet} />
            <Route path='/modifier/:id' exact component={ModifierArticle} />
            
          </Switch>
      </div>
      </Layout>
      </ConnecterContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
