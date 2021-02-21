import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Home from './Home';
import Login from './Login';
import Signin from './Signin';

export default function() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/signin">
                    <Signin />
                </Route>
                <Route path="/signin">
                    <Signin path="/address" address />
                </Route>
            </Switch>
        </Router>
    )
}
