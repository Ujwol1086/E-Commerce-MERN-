import { createSlice } from "@reduxjs/toolkit";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const storedCartItems = userInfo && userInfo.id
    ? JSON.parse(localStorage.getItem(`cartItems`)) || []
    : [];

const initialState = {
    cartItems: storedCartItems,
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) =>
        {
            const itemExist = state.cartItems.find((item) => item.id === action.payload.id && item.name === action.payload.name);
            if (itemExist)
            {
                // Increment quantity of the existing item
                itemExist.quantity += 1;
            } else
            {
                // Add the new item with quantity 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }

            // Save the updated cart to localStorage
            if (userInfo && userInfo.id)
            {
                localStorage.setItem(`cartItems`, JSON.stringify(state.cartItems));
            }
        },

        removeFromCart: (state, action) =>
        {
            if (userInfo && userInfo.id)
            {
                const cartItems = JSON.parse(localStorage.getItem(`cartItems`)) || [];
                const updatedCartItems = cartItems.filter((item) => item.id != action.payload.id);
                localStorage.setItem(`cartItems`, JSON.stringify(updatedCartItems));
                state.cartItems = updatedCartItems;
            }
        },

        resetCart: (state) =>
        {
            // Clear the cart
            state.cartItems = [];

            // Remove cart items from localStorage
            if (userInfo && userInfo.id)
            {
                localStorage.removeItem(`cartItems`);
            }
        },
    },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
