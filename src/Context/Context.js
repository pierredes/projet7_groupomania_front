import React from 'react';

const connecterContext = React.createContext({
    connecter: false,
    token: null,
    admin: false,
    login: () => {}
});

export default connecterContext;