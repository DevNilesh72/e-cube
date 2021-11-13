import './App.css';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routers from './components/routes/Routers';
import React from 'react';
import AdminRoutes from './components/routes/AdminRoutes';

class App extends React.Component {
  constructor(){
    super();
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/admin" component={AdminRoutes}></Route>
            <Route component={Routers}></Route>
          </Switch>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
