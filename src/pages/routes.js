import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../store/user';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import PrivateRoute from './PrivateRoute';

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

import { PROFILE_CUSTOMER_DATA, TIMER_EXPIRE_CART_KEY, TIMER_EXPIRE_CART_INITIAL } from '../utils/data/constants';

import { fetchOrder } from '../store/order';

import { useQuantityControlFetch } from '../hooks/useQuantityControlFetch';

export default function() {
    const storeUser = useSelector(store => store.user);
    const storeOrder = useSelector(store => store.order);
    const dispatch =  useDispatch();
    const storageProfile = JSON.parse(window.sessionStorage.getItem(PROFILE_CUSTOMER_DATA));
    const dataProfile = storageProfile?.constructor.name === 'Object' ? storageProfile : {};
    const [time, setTimer, setCallback] = useQuantityControlFetch(TIMER_EXPIRE_CART_INITIAL);
    const [isLogged, setIsLogged] = useState();

    const [basket, setBasket] = useState([]);

    useEffect(() => dataProfile && dispatch(setUser(dataProfile)), [])

    const updateProfile = (newValue = {}) => {
        window?.sessionStorage.setItem(PROFILE_CUSTOMER_DATA, JSON.stringify(newValue));
        dispatch(setUser(newValue));
    }

    useEffect(() => dispatch(fetchOrder()), []);

    useEffect(() => {
        setIsLogged(!!(storeUser?.email || dataProfile?.email))
    }, [storeUser])

    useEffect(() => {
        const storageTimeCart = +(JSON.parse(window.sessionStorage.getItem(TIMER_EXPIRE_CART_KEY)) || -1);
        if(storageTimeCart > 0) {
            setCallback(() => () => {
                window.sessionStorage.setItem(TIMER_EXPIRE_CART_KEY, -1);
                dispatch(fetchOrder({ force: true }));
            });
            setTimer(storageTimeCart);
        }
    }, [storeOrder]);

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
                    />}
                />
                <Route
                    exact
                    path="/cesta-produtos"
                    children={props => <Cart
                        {...props}
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
