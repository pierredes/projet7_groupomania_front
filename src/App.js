
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './hoc/Layout/Layout';
import jwt from 'jsonwebtoken';

import ListeArticles from './containers/ListeArticles/ListeArticles';
import ArticleComplet from './containers/ArticleComplet/ArticleComplet';
import CreerArticle from './containers/CreerArticle/CreerArticle';
import ModifierArticle from './containers/ModifierArticle/ModifierArticle';
import inscription from './containers/Inscription/Inscription';
import Connection from './containers/Connection/Connection';
import ConnecterContext from './Context/Context';
import MonCompte from './components/MonCompte/MonCompte';
import Admin from './containers/Admin/ListeArticleAdmin/ListeArticleAdmin';
import ListeCommentaireAdmin from './containers/Admin/ListeCommentaireAdmin/ListeCommentaireAdmin';


class App extends Component {

  state = {
    redirection: false,
    connecter: false,
    token: null,
    admin: false,
    error: ''
  }

  connection = (email, password) => {
    let data = {
        email: Object.values(email)[0],
        password: Object.values(password)[0]
    }
    axios.post('http://localhost:8080/api/authentification/connection/', data)
        .then(res => {
            const token = res.data.token;
            localStorage.setItem('token', token);
            const userId = jwt.decode(token);
            this.setState({ redirection: true, connecter: true, token: token});
            if(userId.isAdmin){
              this.setState({ admin: true });
            }
        })
        .catch(error => {
            this.setState({ error: error.response.data.message})
        })
  }

  deconnection = () => {
    this.setState({ connecter: false, token: null, redirection: false, admin: false})
    localStorage.removeItem('token');
    document.location.href = '/connection';
}


  componentDidMount() {
    if(localStorage.getItem('token') && jwt.decode(localStorage.getItem('token')).isAdmin) {
      this.setState({connecter: true, token: localStorage.getItem('token'), admin: true})
    }
    else if(localStorage.getItem('token')){
      this.setState({connecter: true, token: localStorage.getItem('token'), admin: false})
    }
    if(jwt.decode(localStorage.getItem('token')) && (jwt.decode(localStorage.getItem('token')).exp * 1000) > new Date().getTime() == false) {
      this.deconnection()
    }
}
  render () {
    
    return (
      <BrowserRouter>
      <ConnecterContext.Provider value={{connecter: this.state.connecter, token: this.state.token, admin: this.state.admin}}>
      <Layout deconnection={this.deconnection}>
      <div className="App">
          <Switch>
            <Route path='/deconnexion' render={() => this.deconnection()} />
            <Route path='/admin/commentaire/' exact component={ListeCommentaireAdmin} />
            <Route path='/admin' component={Admin} />
            <Route path='/inscription' component={inscription} />
            <Route path='/connection' render={(props) => (<Connection connection={this.connection} redirection={this.state.redirection} erreur={this.state.error} />)} />
            <Route path='/creer-post' component={CreerArticle}/>
            <Route path='/' exact render={() => (<ListeArticles titre='Bonjour et bienvenue sur le forum de Groupomania' />)} />
            <Route path='/mon-compte' exact render={() => (<MonCompte supression={this.deconnection} />)} />
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
