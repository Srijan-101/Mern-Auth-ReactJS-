import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import App from './App'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Activate from './auth/Activate'
import Private from './core/Private'
import Privateroute from './auth/PrivateRoute.js'
import AdminRoute from './auth/AdminRoute'
import Admin from './core/Admin'
import Forgot from './auth/Forgot'
import Reset from './auth/Reset'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/auth/activate/:token" component={Activate}/>
                <Privateroute path="/private" component={Private}/>
                <AdminRoute path="/admin" component={Admin}/>
                <Route exact path="/auth/password" component={Forgot}/>
                <Route path="/auth/password/reset/:token" component={Reset}/>
            </Switch>
        </Router>
    )
}

export default Routes;