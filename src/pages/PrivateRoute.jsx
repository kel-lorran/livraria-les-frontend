import { useCallback } from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom'

import Loader from 'components/Loader';

export default ({ component: Component, isLogged, ...rest }) => {
    const componentComputed = useCallback(props => {
        switch (isLogged) {
            case true:
                return <Component {...props} />;
            case false:
                return <Redirect to={{ pathname: '/login', search: `?redirectUrl=${props.location.pathname}`, state: { from: props.location } }} />
            default:
                return <Loader />
        }
    }, [isLogged, rest.location]);

    return (
        <Route
            {...rest}
            render={componentComputed}
        />
    );
}
