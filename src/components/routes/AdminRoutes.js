import React from 'react'
import { Route, Switch } from 'react-router'
import AddCategory from '../layout/admin/AddCategory'
import AddMovie from '../layout/admin/AddMovie'
import AddScreen from '../layout/admin/AddScreen'
import Admin from '../layout/admin/Admin'
import ManageCategory from '../layout/admin/ManageCategory'
import ManagePrice from '../layout/admin/ManagePrice'
import ManageScreen from '../layout/admin/ManageScreen'
import ManageUser from '../layout/admin/ManageUser'
import Header from '../layout/Header'
import PageNotFound from '../layout/PageNotFound'

const AdminRoutes = () => {
    return (
        <div>
            <Header admin="true"></Header>
            <Switch>
                <Route exact path="/admin/movie/:cat" component={Admin}></Route>
                <Route exact path="/admin/addMovie" component={AddMovie}></Route>
                <Route exact path="/admin/addMovie/:id" component={AddMovie}></Route>
                <Route exact path="/admin/addScreen" component={AddScreen}></Route>
                <Route exact path="/admin/addScreen/:id" component={AddScreen}></Route>
                <Route exact path="/admin/addCategory" component={AddCategory}></Route>
                <Route exact path="/admin/addCategory/:id" component={AddCategory}></Route>
                <Route exact path="/admin/manageCategory" component={ManageCategory}></Route>
                <Route exact path="/admin/manageScreen" component={ManageScreen}></Route>
                <Route exact path="/admin/manageUser" component={ManageUser}></Route>
                <Route exact path="/admin/managePrice/:id" component={ManagePrice}></Route>
                <Route component={PageNotFound}></Route>
            </Switch>
        </div>
    )
}

export default AdminRoutes
