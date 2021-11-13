import React from 'react'
import { Route, Switch } from 'react-router'
import Article from '../layout/Article'
import Booking from '../layout/Booking'
import Header from '../layout/Header'
import Landing from '../layout/Landing'
import PageNotFound from '../layout/PageNotFound'

const Routers = () => {
    return (
        <div>
            <Header admin="false"></Header>
            <Switch>
                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/:cat" component={Landing}></Route>
                <Route exact path="/article/:id" component={Article}></Route>
                <Route exact path="/book/:sid/:mid/:time" component={Booking}></Route>
                <Route component={PageNotFound}></Route>
            </Switch>
        </div>
    )
}

export default Routers
