import react, { Component } from 'react';
import axios from 'axios';

import ConnecterContext from '../../../Context/Context';

import Style from './ListeCommentaireAdmin.module.css';

class ListeCommentaireAdmin extends Component {

    state = {
        commentaires: []
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/commentaire/', {headers: {Authorization: localStorage.getItem('token')}})
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

    render() {
        let commentaire = null;
        commentaire = this.state.commentaires.map(commentaire => {
            return (
                <div key={commentaire.id} className={Style.Commentaire}>
                    <p>{commentaire.contenu}</p>
                    <button> Supprimer</button>
                </div>
            )
        })
        return (
            <ConnecterContext.Consumer>
                {(context) => (
                    context.admin ?
                        <div>       
                            <h1> Voici la pages d'administration des commentaire</h1>
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