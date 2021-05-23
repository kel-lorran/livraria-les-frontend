import { createSlice } from '@reduxjs/toolkit';
import { BASKET_KEY_SESSIONSTORAGE } from '../utils/data/constants';

const storageBasket = JSON.parse(window.sessionStorage.getItem(BASKET_KEY_SESSIONSTORAGE));
const initialState = storageBasket?.constructor.name === 'Array' ? storageBasket : [];

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        clearBasket: () => {
            window.sessionStorage.setItem(BASKET_KEY_SESSIONSTORAGE, "[]");
            return [];
        },
        setBasket: (state, action) => {
            let hasInList = false;
            const _basket = state.map(m => {
                if (m.id == action.payload.id) {
                    hasInList = true;
                    return {
                        ...m,
                        quantity: (m.quantity + action.payload.quantity) > 0 ? m.quantity + action.payload.quantity : 0
                    }
                }
                return m;
            });
            const result = hasInList ? _basket : [..._basket, action.payload];
            window.sessionStorage.setItem(BASKET_KEY_SESSIONSTORAGE, JSON.stringify(result));
            return result;
        }
    }
})

export const { setBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
