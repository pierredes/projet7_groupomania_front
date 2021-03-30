import React from 'react';

const connecterContext = React.createContext({
    connecter: false,
    token: null,
    admin: false,
    user_id: null,
    login: () => {}
});

export default connecterContext;