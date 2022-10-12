import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   totalPrice: 0,
   items: []
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action) {
         const findItem = state.items.find((obj) => {
            return (
               (obj.id === action.payload.id) &&
               (obj.size === action.payload.size) &&
               (obj.type === action.payload.type))
         });
         findItem ? findItem.count++ : state.items.push({
            ...action.payload, count: 1
         });
         state.totalPrice = state.items.reduce((sum, obj) => { return obj.price * obj.count + sum }, 0)
      },
      minusItem(state, action) {
         const findItem = state.items.find(obj => {
            return ((obj.id === action.payload.id) &&
               (obj.size === action.payload.size) &&
               (obj.type === action.payload.type))
         });
         findItem && findItem.count--;
         state.totalPrice -= findItem.price;
      },
      removeItem(state, action) {
         const findItem = state.items.find(obj => {
            return ((obj.id === action.payload.id) &&
               (obj.size === action.payload.size) &&
               (obj.type === action.payload.type))
         });
         state.totalPrice -= findItem.price * findItem.count;
         state.items = state.items.filter(obj => {
            return ((obj.id !== action.payload.id) ||
               (obj.size !== action.payload.size) ||
               (obj.type !== action.payload.type))
         });
      },
      cleareItems(state) {
         state.items = [];
         state.totalPrice = 0;
      },
   }
})

// ** Редакс-селектор - обычная функция, которая, так же как и анонимная функция в useSelector'e, вытаскивает данные из стейта и передает их в useSelector, и далее экспортируется в нужный селектор;
export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => state => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, cleareItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;