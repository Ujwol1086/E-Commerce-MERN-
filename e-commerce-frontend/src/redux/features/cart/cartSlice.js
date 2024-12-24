import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) =>
        {
            const itemExist = state.cartItems.find((item) => item.id === action.payload.id);
            if (itemExist)
            {
                // Increment quantity of the existing item
                itemExist.quantity += 1;
            } else
            {
                // Add the new item with quantity 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        resetCart: (state) =>
        {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
        },
    }
})
export const { addToCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;