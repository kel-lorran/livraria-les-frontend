import { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'

//admin pages
import Dashboard from './Admin/Home';
import Books from './Admin/Books';
import Customers from './Admin/Customers';
import Addresses from './Admin/Customers/address'
import Orders from './Admin/Orders';
import Stock from './Admin/Stock';

//all user
import Home from './Home';
import Single from './Single';
import Login from './Login';
import Signin from './Signin';
import Cart from './Cart';

//customer pages
import Profile from './Profile';

import { PROFILE_CUSTOMER_DATA } from '../utils/data/constants';

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isLogged() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

export default function() {
    const storageProfileJson = window?.sessionStorage.getItem(PROFILE_CUSTOMER_DATA);
    let dataProfile;
    if(storageProfileJson) dataProfile = JSON.parse(storageProfileJson);

    const [profile, setProfile] = useState(dataProfile);
    const [basket, setBasket] = useState([]);

    const updateProfile = (newValue = {}) => {
        window?.sessionStorage.setItem(PROFILE_CUSTOMER_DATA, JSON.stringify(newValue));
        setProfile(newValue);
    }

    const isLogged = () => !!profile?.email;

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home profile={profile} />
                </Route>
                <Route
                    exact
                    path="/livro/:productId"
                    children={props => <Single
                        {...props}
                        setBasket={setBasket}
                        basket={basket} 
                        profile={profile}
                        updateProfile={updateProfile}
                    />}
                />
                <Route
                    exact
                    path="/cesta-produtos"
                    children={props => <Cart
                        {...props}
                        setBasket={setBasket}
                        basket={basket} 
                        profile={profile}
                        updateProfile={updateProfile}
                    />}
                />
                <Route
                    path="/login"
                    children={props => <Login {...props}  profile={profile} updateProfile={updateProfile} />}
                />
                <Route
                    path="/signin"
                    children={props => <Signin {...props}  profile={profile} updateProfile={updateProfile} />}
                />
                <Route path="/signin">
                    <Signin path="/address" address  profile={profile} updateProfile={updateProfile} />
                </Route>
                <Route path="/profile">
                    <Profile  profile={profile} updateProfile={updateProfile} />
                </Route>
                <PrivateRoute exact path="/admin" isLogged={isLogged} component={
                    () => <Dashboard profile={profile} updateProfile={updateProfile} />
                } />
                <PrivateRoute path="/admin/livros" isLogged={isLogged} component={
                    () => <Books profile={profile} updateProfile={updateProfile} />
                } />
                <PrivateRoute exact path="/admin/clientes" isLogged={isLogged} component={
                    () => <Customers profile={profile} updateProfile={updateProfile} />
                } />
                <PrivateRoute path="/admin/clientes/endereco" isLogged={isLogged} component={
                    () => <Addresses profile={profile} updateProfile={updateProfile} />
                } />
                <PrivateRoute path="/admin/pedidos" isLogged={isLogged} component={
                    () => <Orders profile={profile} updateProfile={updateProfile} />
                } />
                <PrivateRoute path="/admin/estoque" isLogged={isLogged} component={
                    () => <Stock profile={profile} updateProfile={updateProfile} />
                } />
            </Switch>
        </Router>
    )
}
