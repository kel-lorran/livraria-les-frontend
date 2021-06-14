import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDraftOrderById } from '../actions/orderActions';

import { setOrder } from '../store/order';

export const useQuantityControlFetch = () => {
    const [internTimer, setInternTimer] = useState(-1)
    const dispatch = useDispatch();
    const [lastCall, setLastCall] = useState();
    const storeOrder = useSelector(store => store.order);
    

    const _setLastCall = (call, timer) => {
        setLastCall(call);
        setInternTimer(timer);
    }

    const lastCallExec = () => {
        typeof lastCall === 'function' && lastCall()
    };

    useEffect(() => {
        const func = setTimeout(() => internTimer > 0 ? setInternTimer(internTimer - 1000) : lastCallExec(), 1000);
        return () => clearTimeout(func);
    }, [internTimer])

    return [internTimer, setInternTimer, _setLastCall];
}