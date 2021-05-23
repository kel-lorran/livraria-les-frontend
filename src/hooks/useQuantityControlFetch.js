import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOrderById } from '../actions/orderActions';

import { setOrder } from '../store/order';

export const useQuantityControlFetch = (timer = 4000) => {
    const [internTimer, setInternTimer] = useState(timer)
    const dispatch = useDispatch();
    const [lastCall, setLastCall] = useState();
    const storeOrder = useSelector(store => store.order);
    

    const _setLastCall = call => {
        setLastCall(call);
        setInternTimer(timer);
    }

    const fetchQuantites = () => {
        typeof lastCall === 'function' && lastCall()
    };

    useEffect(() => {
        const func = setTimeout(() => internTimer > 0 ? setInternTimer(internTimer - 1000) : fetchQuantites(), 1000);
        return () => clearTimeout(func);
    }, [internTimer])

    return [internTimer, setInternTimer, _setLastCall];
}