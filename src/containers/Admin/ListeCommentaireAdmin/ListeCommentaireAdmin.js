import react, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ConnecterContext from '../../../Context/Context';

import Style from './ListeCommentaireAdmin.module.css';

class ListeCommentaireAdmin extends Component {

    state = {
        commentaires: [],
        updatePage: false
    }

    static contextType = ConnecterContext;

    componentDidMount() {
        axios.get('http://localhost:8080/api/commentaire/', {headers: {Authorization: localStorage.getItem('token')}})
        .then(res => {
            const commentaire = res.data.commentaire;
            const recupererTousLesCommentaire = commentaire.map(commentaire => {
                return {
                    ...commentaire
                }
            })
            this.setState({ commentaires: recupererTousLesCommentaire });
        })
    }

    componentDidUpdate() {
        if(this.state.updatePage) {
            axios.get('http://localhost:8080/api/commentaire/',  {headers: {Authorization: localStorage.getItem('token')}})
            .then((res) => {
                const commentaire = res.data.commentaire;
                const commentaireUpdate = commentaire.map(commentaire => {
                    return {
                        ...commentaire
                    }
                })
                this.setState({ updatePage: false, commentaires: commentaireUpdate })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    supprimerCommentaire = (id) => {
        axios.delete('http://localhost:8080/api/commentaire/supprimer/' + id,  {data: {admin: this.context.admin}, headers: {Authorization: localStorage.getItem('token')}})
            .then(() => {
                this.setState({ updatePage: true });
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        let commentaire = null;
        commentaire = this.state.commentaires.map(commentaire => {
            return (
                <div key={commentaire.id} className={Style.Commentaire}>
                    <p>{commentaire.contenu}</p>
                    <button onClick={() => this.supprimerCommentaire(commentaire.id)}> Supprimer</button>
                </div>
            )
        })
        return (
            <ConnecterContext.Consumer>
                {(context) => (
                    context.admin ?
                        <div>
                            <h1> Bienvenue sur l'interface d'administration</h1>
                            <h2> Voici la pages d'administration des commentaire</h2>
                            <button><Link to='/admin/'>Article</Link></button>
                            <div className={Style.ListeCommentaire}>
                                {commentaire}
                            </div>
                        </div>
                    :
                        <p>Veulliez vous connecter en tant qu'administrateur pour accédez à cette page </p>
                )}
            </ConnecterContext.Consumer>
            
        )
    }
}

export default ListeCommentaireAdmin;