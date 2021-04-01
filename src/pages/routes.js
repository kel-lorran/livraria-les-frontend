import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../store/user';

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
import ProfileAddress from './Profile/address';
import ProfileCard from './Profile/card';
import ProfileOrders from './Profile/Orders';

import { PROFILE_CUSTOMER_DATA } from '../utils/data/constants';

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isLogged() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login',  search: `?redirectUrl=${props.location.pathname}`, state: { from: props.location } }} />
                )
            }
        />
    );
}

export default function() {
    const storeUser = useSelector(store => store.user);
    const dispatch =  useDispatch();
    const storageProfileJson = window?.sessionStorage.getItem(PROFILE_CUSTOMER_DATA) || 'null';
    const dataProfile = JSON.parse(storageProfileJson);
    const [basket, setBasket] = useState([]);

    useEffect(() => dataProfile && dispatch(setUser(dataProfile)), [])

    const updateBasket = newItem => {
        let hasInList = false;
        const _basket = basket.map(m => {
            if (m.id == newItem.id) {
                hasInList = true;
                return {
                    ...m,
                    quantity: (m.quantity + newItem.quantity) > 0 ? m.quantity + newItem.quantity : 0
                }
            }
            return m;
        });
        setBasket(hasInList ? _basket : [..._basket, newItem]);
    }

    const clearBasket = () => setBasket([]);

    const updateProfile = (newValue = {}) => {
        window?.sessionStorage.setItem(PROFILE_CUSTOMER_DATA, JSON.stringify(newValue));
        dispatch(setUser(newValue));
    }

    const isLogged = () => !!storeUser?.email || dataProfile;

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route
                    exact
                    path="/livro/:productId"
                    children={props => <Single
                        {...props}
                        updateBasket={updateBasket}
                        basket={basket} 
                    />}
                />
                <Route
                    exact
                    path="/cesta-produtos"
                    children={props => <Cart
                        {...props}
                        updateBasket={updateBasket}
                        basket={basket} 
                        clearBasket={clearBasket}
                    />}
                />
                <Route
                    path="/login"
                    children={props => <Login {...props} updateProfile={updateProfile} />}
                />
                <Route
                    path="/signin"
                    children={props => <Signin {...props}  updateProfile={updateProfile} />}
                />

                <PrivateRoute exact path="/profile" isLogged={isLogged} component={() => <Profile />} />
                <PrivateRoute exact path="/profile/endereco" isLogged={isLogged} component={() => <ProfileAddress />} />
                <PrivateRoute exact path="/profile/cartao" isLogged={isLogged} component={() => <ProfileCard />} />
                <PrivateRoute exact path="/profile/meus-pedidos" isLogged={isLogged} component={() => <ProfileOrders />} />

                <PrivateRoute exact path="/admin" isLogged={isLogged} component={() => <Dashboard />} />
                <PrivateRoute path="/admin/livros" isLogged={isLogged} component={() => <Books />} />
                <PrivateRoute exact path="/admin/clientes" isLogged={isLogged} component={() => <Customers />} />
                <PrivateRoute path="/admin/clientes/endereco" isLogged={isLogged} component={() => <Addresses />} />
                <PrivateRoute path="/admin/pedidos" isLogged={isLogged} component={() => <Orders />} />
                <PrivateRoute path="/admin/estoque" isLogged={isLogged} component={() => <Stock />} />
            </Switch>
        </Router>
    )
}
