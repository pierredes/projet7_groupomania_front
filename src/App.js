import './App.css';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ListeArticles from './containers/ListeArticles/ListeArticles'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Layout />
        <Switch>
          {/* <Route path='/creer-post' component={ListeArticles}/> */}
          <Route path='/' exact component={ListeArticles} />
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
