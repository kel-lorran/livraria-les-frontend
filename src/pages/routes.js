import { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

//admin pages
import Dashboard from './Admin/Home';
import Books from './Admin/Books';
import Customers from './Admin/Customers';
import Orders from './Admin/Orders';
import Stock from './Admin/Stock';


import Home from './Home';
import Login from './Login';
import Signin from './Signin';
import Profile from './Profile';

import { PROFILE_CUSTOMER_DATA } from '../utils/data/constants';

export default function() {
    const storageProfileJson = window?.sessionStorage.getItem(PROFILE_CUSTOMER_DATA);
    let dataProfile;
    if(storageProfileJson) dataProfile = JSON.parse(storageProfileJson);

    const [profile, setProfile] = useState(dataProfile);

    const updateProfile = (newValue = {}) => {
        window?.sessionStorage.setItem(PROFILE_CUSTOMER_DATA, JSON.stringify(newValue));
        setProfile(newValue);
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home profile={profile} updateProfile={updateProfile} />
                </Route>
                <Route path="/login">
                    <Login  profile={profile} updateProfile={updateProfile} />
                </Route>
                <Route exact path="/signin">
                    <Signin  profile={profile} updateProfile={updateProfile} />
                </Route>
                <Route path="/signin">
                    <Signin path="/address" address  profile={profile} updateProfile={updateProfile} />
                </Route>
                <Route path="/profile">
                    <Profile  profile={profile} updateProfile={updateProfile} />
                </Route>
                <Route exact path="/admin">
                    <Dashboard />
                </Route>
                <Route path="/admin/livros">
                    <Books />
                </Route>
                <Route path="/admin/clientes">
                    <Customers />
                </Route>
                <Route path="/admin/pedidos">
                    <Orders />
                </Route>
                <Route path="/admin/estoque">
                    <Stock />
                </Route>
            </Switch>
        </Router>
    )
}
