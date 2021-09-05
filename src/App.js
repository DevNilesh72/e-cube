import './App.css';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routers from './components/routes/Routers';
import React from 'react';

class App extends React.Component {
  constructor(){
    super();
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route component={Routers}></Route>
          </Switch>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
