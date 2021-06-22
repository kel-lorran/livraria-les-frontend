import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_ID } from '../utils/data/constants';

import { getDraftOrderById } from '../actions/orderActions';

const orderId = JSON.parse(window.sessionStorage.getItem(ORDER_ID));
const initialState = {
    id: orderId,
    merchandiseList: [],
    creditCardList: []
};

export const fetchOrder = createAsyncThunk(
    'user/fetch',
    async (force, { getState }) => {
        const { order } = getState();
        if(order.id && (!order.merchandiseList.length || force)) {
            const result = await getDraftOrderById(order.id).then(r => r.data);
            return result;
        }
    }
)

const _clearOrder = () => {
    window.sessionStorage.setItem(ORDER_ID, null);
    return { ...initialState, id: undefined };
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            if (action.payload.id) {
                window.sessionStorage.setItem(ORDER_ID, action.payload.id)
                return action.payload
            }
            return initialState
        },
        clearOrder: _clearOrder
    },
    extraReducers: {
        [fetchOrder.fulfilled]: (state, action) => {
            if(action.payload)
                return action.payload
            clearOrder()
        },
        [fetchOrder.rejected]: (state, action) => {
            _clearOrder()
        }
    }
})

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
