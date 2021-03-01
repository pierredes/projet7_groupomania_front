import React from 'react';

const connecterContext = React.createContext({
    connecter: false,
    token: null,
    login: () => {}
});

export default connecterContext;