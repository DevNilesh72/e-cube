import React from 'react'
import { Route, Switch } from 'react-router'
import Article from '../layout/Article'
import Booking from '../layout/Booking'
import Landing from '../layout/Landing'
import PageNotFound from '../layout/PageNotFound'
import AdminRoutes from './AdminRoutes'

const Routers = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/index" component={Landing}></Route>
                <Route exact path="/article" component={Article}></Route>
                <Route exact path="/book" component={Booking}></Route>
                <Route path="/admin" component={AdminRoutes}></Route>
                <Route component={PageNotFound}></Route>
            </Switch>
        </div>
    )
}

export default Routers
