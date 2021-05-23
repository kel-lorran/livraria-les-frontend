import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_ID } from '../utils/data/constants';

import { getOrderById } from '../actions/orderActions';

const orderId = JSON.parse(window.sessionStorage.getItem(ORDER_ID));
const initialState = {
    id: orderId,
    merchandiseList: [],
    creditCardList: []
};

export const fetchOrder = createAsyncThunk(
    'user/fetch',
    async ({ force }, { getState }) => {
        const { order } = getState();
        if(order.id && (!order.merchandiseList.length || force)) {
            try {
                const result = await getOrderById(order.id).then(r => r.data);
                return result;
            } catch {
                return { ...initialState, id: undefined };
            }
        }
    }
)

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
        clearOrder: () => {
            window.sessionStorage.setItem(ORDER_ID, "");
            return { ...initialState, id: undefined };
        }
    },
    extraReducers: {
        [fetchOrder.fulfilled]: (state, action) => {
            return action.payload
        }
    }
})

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
